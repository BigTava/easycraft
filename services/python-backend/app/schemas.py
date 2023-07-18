from pydantic import BaseModel


class OrderPayloadSchema(BaseModel):
    order: str


class OrderResponseSchema(BaseModel):
    message: str
