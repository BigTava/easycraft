import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

log = logging.getLogger("uvicorn")


def create_application() -> FastAPI:
    application = FastAPI(
        title="Space Capacity Python Backend",
        version="1.0.0",
        openapi_version="3.0.2",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
    )

    from app.router import router
    application.include_router(router)

    origins = [
        "*",
        "http://localhost:3007",
        "localhost:3007",
        "http://ui-core:3000",
        "ui-core:3000",
    ]

    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "HEAD", "OPTIONS", "DELETE", "PUT"],
        allow_headers=[
            "Access-Control-Allow-Headers",
            "Set-Cookie",
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin",
            "X-Requested-With",
        ],
    )

    return application


app = create_application()


@app.get("/health-check")
def health_check():
    return {"message": "OK"}


@app.on_event("startup")
async def startup_event():
    log.info("Starting up...")


@app.on_event("shutdown")
async def shutdown_event():
    log.info("Shutting down...")
