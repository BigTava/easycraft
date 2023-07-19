from app.schemas import OrderPayloadSchema, OrderResponseSchema
from app.service import ask_feedback
from fastapi import APIRouter, status

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.post(
    "", status_code=status.HTTP_201_CREATED,
    response_model=OrderResponseSchema
)
async def post_order(
    payload: OrderPayloadSchema,
) -> OrderResponseSchema:
    output = await ask_feedback(payload.order)

    return {"message": output}
