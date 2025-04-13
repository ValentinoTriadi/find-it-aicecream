# FastAPI Project

This is a FastAPI project template that includes a structured folder layout for routers, models, services, and utilities. It also supports WebSocket connections and provides additional API routes.

## Project Structure

```
fastapi-project
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── routers
│   │   ├── __init__.py
│   │   ├── api_routes.py
│   │   └── websocket_routes.py
│   ├── models
│   │   ├── __init__.py
│   │   └── msg_payload.py
│   ├── services
│   │   ├── __init__.py
│   │   └── message_service.py
│   └── utils
│       ├── __init__.py
│       └── helpers.py
├── requirements.txt
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd fastapi-project
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required dependencies:**
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the FastAPI application, execute the following command:

```
uvicorn app.main:app --reload
```

You can access the API documentation at `http://127.0.0.1:8000/docs`.

## Features

- RESTful API routes for managing messages.
- WebSocket support for real-time messaging.
- Modular structure with separate folders for routers, models, services, and utilities.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.