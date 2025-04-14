import json
import time
from fastapi import WebSocket


class BattleService:
    def __init__(self):
        self.clients = {}  # room_id -> list[WebSocket]
        self.token_map = {}  # websocket -> token
        self.state = {}  # room_id -> dict

    def register(self, websocket: WebSocket, token: str, room_id: str):
        self.clients.setdefault(room_id, []).append(websocket)
        self.token_map[websocket] = token
        if room_id not in self.state:
            self.state[room_id] = {
                "round": 1,
                "playerMuteCount": 0,
                "enemyMuteCount": 0,
                "startTimestamp": int(time.time() * 1000)
            }

    def update_state(self, room_id: str, new_data: dict):
        if room_id in self.state:
            self.state[room_id].update(new_data)

    async def sync_state(self, room_id: str):
        if room_id not in self.state:
            return
        state = self.state[room_id]
        
        await self.broadcast(room_id, "sync-state", state)

    async def broadcast(self, room_id: str, event: str, data: dict):
        dead_clients = []
        message = json.dumps({
            "event": event,
            "data": data
        })
        for ws in self.clients.get(room_id, []):
            try:
                await ws.send_text(message)
            except:
                dead_clients.append(ws)
        for dead_ws in dead_clients:
            await self.close_connection(dead_ws)

    async def close_connection(self, websocket: WebSocket):
        
        for rid, sockets in self.clients.items():
            if websocket in sockets:
                
                sockets.remove(websocket)
                break
        self.token_map.pop(websocket, None)
