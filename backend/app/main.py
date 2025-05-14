from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.routers import api_routes, matchmaking_routes, battle_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(api_routes.router)
app.include_router(matchmaking_routes.router)
app.include_router(battle_routes.router)

@app.get("/")
def root():
    return {"message": "WebSocket Multiplayer Server Ready"}

if __name__ == "__main__":
    uvicorn.run('app.main:app', host='0.0.0.0', port=8181, reload=True)