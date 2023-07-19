from typing import Optional

from pydantic import BaseModel


class OrderPayloadSchema(BaseModel):
    order: str
    decentralized_computation: bool = False


class OrderResponseSchema(BaseModel):
    message: str
    orderId: Optional[str]
    capacityId: Optional[str]
