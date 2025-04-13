class WebsocketService():
    def __init__(self):
        self.client = {}

    def add_connection(self, websocket, room_id):
        try:
            if room_id in self.client:
                self.client[room_id].append(websocket)
            else:
                self.client[room_id] = [websocket]
            print(f"Client connected: {websocket.client}")
            print(f"Active clients: {self.client}")
        except Exception as e:
            print(f"Error adding connection: {e}")

    async def receive_message(self, websocket):
        return await websocket.receive_text()
    
    async def broadcast(self, message, room_id):
        for connection in self.client[room_id]:
            try:
                await connection.send_text(message)
            except Exception as e:
                print(f"Error sending message to {connection.client}: {e}")
                self.client[room_id].remove(connection)

        print(f"Broadcasting message: {message}")

    async def close_connection(self, websocket):
        await websocket.close()
        print(f"Client disconnected: {websocket.client}")