import time
from typing import Dict, List, Tuple
from starlette.websockets import WebSocket

class MatchmakingService:
    def __init__(self):
        self.queue: Dict[str, List[Tuple[WebSocket, str]]] = {}  # match_key -> list of (websocket, token)
        self.room_lookup: Dict[str, str] = {}  # token -> room_id
        self.token_index: Dict[str, int] = {}  # token -> index (0 or 1)

    def add_to_queue(self, match_key: str, websocket: WebSocket, token: str):
        if match_key not in self.queue:
            self.queue[match_key] = []
        if token not in self.room_lookup:
            self.queue[match_key].append((websocket, token))

    def get_match_for(self, match_key: str, websocket: WebSocket, token: str) -> str | None:
        if token in self.room_lookup:
            return self.room_lookup[token]

        queue = self.queue.get(match_key, [])
        if len(queue) >= 2:
            (ws1, token1), (ws2, token2) = queue.pop(0), queue.pop(0)
            room_id = f"room-{match_key}-{int(time.time() * 1000)}"

            self.token_index[token1] = 0
            self.token_index[token2] = 1
            self.room_lookup[token1] = room_id
            self.room_lookup[token2] = room_id

            print(f"✅ Matched: {token1} (0), {token2} (1) → {room_id}")
            return room_id

        return None

    def get_index(self, token: str) -> int:
        return self.token_index.get(token, -1)
