# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from routers import api_routes, websocket_routes

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(api_routes.router)
# app.include_router(websocket_routes.router)

# @app.get("/")
# def root() -> dict[str, str]:
#     return {"message": "Welcome to the FastAPI project!"}

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import matchmaking_routes, battle_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(matchmaking_routes.router)
app.include_router(battle_routes.router)

@app.get("/")
def root():
    return {"message": "WebSocket Multiplayer Server Ready"}

if __name__ == "__main__":
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)