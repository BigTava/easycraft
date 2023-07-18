from pydantic import BaseModel


class OrmBaseModel(BaseModel):
    class Config:
        orm_mode = True


class OrderPayloadSchema(OrmBaseModel):
    type: str


class OrderResponseSchema(OrmBaseModel):
    status: str