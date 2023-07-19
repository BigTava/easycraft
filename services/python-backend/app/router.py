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
        return {"message": output[0]["generated_text"]}
    else:
        # output = await run_in_bacalhau(payload.order)
        output = call_prompt(create_order_input(payload.order))
        generated_text = output[0]["generated_text"]
        response = {}
        response["message"] = generated_text
        response["orderId"] = "0x9269195a0e6303c68fc632ed9e0b7dd83a4517946cfc94cc99b2e6b25f5d2447"
        response["capacityId"] = "0xb15bf9f04e846c844a244f94b582e0634469d275a92ca234f65088a60166a449"
        response["amount"] = 5
        return {"message": response["message"], "orderId": response["orderId"], "capacityId": 
                response["capacityId"], "amount": response["amount"]}
