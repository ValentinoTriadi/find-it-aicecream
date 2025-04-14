from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from services.battle_service import BattleService
import json

router = APIRouter()
battle_service = BattleService()

@router.websocket("/ws/battle")
async def websocket_battle(
    websocket: WebSocket,
    room_id: str = Query(...),
    token: str = Query(...)
):
    await websocket.accept()
    battle_service.register(websocket, token, room_id)

    # Sync state after join
    await battle_service.sync_state(room_id)

    try:
        while True:
            message_text = await websocket.receive_text()
            message = json.loads(message_text)

            event_type = message.get("event")
            data = message.get("data")

            if event_type == "update-state":
                # Update internal state and sync to everyone
                battle_service.update_state(room_id, data)
                await battle_service.sync_state(room_id)
            elif event_type == "message":
                # Broadcast player message
                await battle_service.broadcast(room_id, "message", data)
    except WebSocketDisconnect:
        await battle_service.close_connection(websocket)
