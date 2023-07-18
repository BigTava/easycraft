from app.schemas import OrderPayloadSchema, OrderResponseSchema
from app.service import verify_order
from fastapi import APIRouter, status

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.post(
    "", status_code=status.HTTP_201_CREATED,
    response_model=OrderResponseSchema
)
async def post_contract(
    payload: OrderPayloadSchema,
) -> OrderResponseSchema:
    output = verify_order(payload.order)
    return output
