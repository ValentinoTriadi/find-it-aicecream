from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.websocket_service import WebsocketService

router = APIRouter()
ws = WebsocketService()

@router.websocket("/ws/{id}")
async def websocket_endpoint(websocket: WebSocket, id):
    await websocket.accept()
    ws.add_connection(websocket, id)
    try:
        while True:
            data = await ws.receive_message(websocket)
            print(f"Received message: {data}")
            await ws.broadcast(data, id)
    except WebSocketDisconnect:
        print(f"Client disconnected: {websocket.client}")
        await ws.close_connection(websocket)