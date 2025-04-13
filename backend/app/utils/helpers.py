def format_message(msg_id: int, msg_name: str) -> str:
    return f"Message ID: {msg_id}, Message Name: {msg_name}"

def validate_msg_name(msg_name: str) -> bool:
    return isinstance(msg_name, str) and len(msg_name) > 0

def generate_response(success: bool, data: dict = None, error: str = None) -> dict:
    response = {"success": success}
    if data:
        response["data"] = data
    if error:
        response["error"] = error
    return response