from app.schemas import OrderPayloadSchema, OrderResponseSchema
from fastapi import APIRouter, status

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.post(
    "/", status_code=status.HTTP_201_CREATED,
    response_model=OrderResponseSchema
)
async def post_contract(
    order: OrderPayloadSchema,
) -> OrderResponseSchema:

    return "hey"
