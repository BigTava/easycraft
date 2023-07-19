from app.schemas import OrderPayloadSchema, OrderResponseSchema
from app.service import ask_feedback, run_in_bacalhau
from fastapi import APIRouter, status

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.post(
    "", status_code=status.HTTP_201_CREATED,
    response_model=OrderResponseSchema
)
async def post_order(
    payload: OrderPayloadSchema,
) -> OrderResponseSchema:
    if payload.decentralized_computation is False:
        output = await ask_feedback(payload.order)
    else:
        output = await run_in_bacalhau(payload.order)

    return {"message": output}
