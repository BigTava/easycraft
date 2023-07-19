from app.schemas import OrderPayloadSchema, OrderResponseSchema
from app.service import ask_feedback, call_prompt, run_in_bacalhau
from app.utils import create_order_input
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
        return {"message": output}
    else:
        # output = await run_in_bacalhau(payload.order)
        output = await call_prompt(create_order_input(payload.order))
        output["message"] = output
        output["orderId"] = "1111"
        output["supplierId"] = "2222"
        output["amount"] = 5
        return {"message": output["message"], "orderId": output["orderId"], "supplierId": 
                output["supplierId"], "amount": output["amount"]}
