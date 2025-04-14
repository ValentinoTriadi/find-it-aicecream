from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from services.websocket_service import WebsocketService
import json

router = APIRouter()
ws_service = WebsocketService()

@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    topic_id: str = Query(...),
    subtopic_id: str = Query(...)
):
    await websocket.accept()
    match_key = f"{topic_id}:{subtopic_id}"
    ws_service.add_to_queue(match_key, websocket)

    import asyncio
    room_id = None
    while not room_id:
        room_id = ws_service.get_match_for(match_key, websocket)
        if not room_id:
            await asyncio.sleep(0.3)

    await websocket.send_text(json.dumps({
        "event": "match-found",
        "data": { "roomId": room_id }
    }))

    try:
        while True:
            msg = await ws_service.receive_message(websocket)
            await ws_service.broadcast(json.dumps({
                "event": "message",
                "data": {
                    "message": msg
                }
            }), room_id)
    except WebSocketDisconnect:
        await ws_service.close_connection(websocket)

