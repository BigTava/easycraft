from app.schemas import OrderPayloadSchema, OrderResponseSchema
from app.service import run_prompt
from fastapi import APIRouter, status

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.post(
    "", status_code=status.HTTP_201_CREATED,
    response_model=OrderResponseSchema
)
async def post_order(
    payload: OrderPayloadSchema,
) -> OrderResponseSchema:
    output = run_prompt(payload.order)

    return output
