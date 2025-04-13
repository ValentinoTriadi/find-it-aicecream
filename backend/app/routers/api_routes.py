from fastapi import APIRouter, HTTPException
from services.ai_service import AIService


router = APIRouter()
ai = AIService()


@router.get("/health")
def message_items():
    return "Server is running healthy!"


@router.post("/ai/score")
async def get_ai_score(body: dict):
    try:
        score = await ai.generate_scoring(body["conversation"])
        return {"score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ai/feedback")
async def get_ai_feedback(body: dict):
    try:
        feedback = await ai.generate_feedback(body["conversation"])
        return {"feedback": feedback}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ai/script")
async def get_ai_script(body: dict):
    try:
        script = await ai.generate_recommend_script(body["user"], body["conversation"])
        return {"script": script}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/ai/objectives")
async def get_ai_objectives(body: dict):
    try:
        required_fields = ["topic", "conversation", "role", "objective"]
        if not all(field in body for field in required_fields):
            raise HTTPException(status_code=400, detail="Missing required fields")
            
        objectives = await ai.generate_objective_scoring(
            topic=body["topic"],
            conversation=body["conversation"],
            role=body["role"],
            objective=body["objective"]
        )
        return {"objectives": objectives}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
