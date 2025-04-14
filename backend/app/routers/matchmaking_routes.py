from fastapi import APIRouter, WebSocket, Query
from app.services.matchmaking_service import MatchmakingService
import json
import asyncio

router = APIRouter()
mm_service = MatchmakingService()

@router.websocket("/ws/matchmake")
async def websocket_matchmaking(
    websocket: WebSocket,
    topic_id: str = Query(...),
    subtopic_id: str = Query(...),
    token: str = Query(...)
):
    await websocket.accept()
    match_key = f"{topic_id}:{subtopic_id}"

    print(f"[MATCHMAKING] {token} joined queue for {match_key}")
    mm_service.add_to_queue(match_key, websocket, token)

    room_id = None
    try:
        while not room_id:
            room_id = mm_service.get_match_for(match_key, websocket, token)
            if room_id:
                my_index = mm_service.get_index(token)
                print(f"[MATCH FOUND] Token: {token}, Index: {my_index}, Room: {room_id}")

                await websocket.send_text(json.dumps({
                    "event": "match-found",
                    "data": {
                        "roomId": room_id,
                        "myIndex": my_index
                    }
                }))
                break

            await asyncio.sleep(0.25)  # Wait for another player
    except Exception as e:
        print(f"[ERROR] Matchmaking error for {token}: {e}")
    finally:
        await websocket.close()
        print(f"[MATCHMAKING CLOSED] {token}")
