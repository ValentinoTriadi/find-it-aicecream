class WebsocketService:
    def __init__(self):
        self.client = {}  # room_id -> [ws]
        self.waiting_queue = {}  # match_key -> [ws]
        self.room_lookup = {} 

    def add_to_queue(self, match_key: str, websocket):
        if match_key not in self.waiting_queue:
            self.waiting_queue[match_key] = []
        self.waiting_queue[match_key].append(websocket)

    def match_players(self, match_key: str):
        queue = self.waiting_queue.get(match_key, [])
        if len(queue) >= 2:
            ws1 = queue.pop(0)
            ws2 = queue.pop(0)
            room_id = f"room-{match_key}-{id(ws1)}-{id(ws2)}"
            return room_id, ws1, ws2
        return None
    
    def get_match_for(self, match_key: str, websocket):
        if websocket in self.room_lookup:
            return self.room_lookup[websocket]

        queue = self.waiting_queue.get(match_key, [])
        if websocket not in queue:
            return None

        if len(queue) >= 2:
            ws1 = queue.pop(0)
            ws2 = queue.pop(0)
            room_id = f"room-{match_key}-{id(ws1)}-{id(ws2)}"
            self.add_connection(ws1, room_id)
            self.add_connection(ws2, room_id)
            self.room_lookup[ws1] = room_id
            self.room_lookup[ws2] = room_id
            return room_id
        return None



    def add_connection(self, websocket, room_id):
        if room_id not in self.client:
            self.client[room_id] = []
        self.client[room_id].append(websocket)

    async def receive_message(self, websocket):
        return await websocket.receive_text()

    async def broadcast(self, message, room_id):
        for conn in self.client.get(room_id, []):
            try:
                await conn.send_text(message)
            except Exception:
                self.client[room_id].remove(conn)

    async def close_connection(self, websocket):
        await websocket.close()
        for room in self.client.values():
            if websocket in room:
                room.remove(websocket)
