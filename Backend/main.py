from fastapi import FastAPI
from predict import router as predict_router
from signup import router as signup_router
from login import router as login_router
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the prediction router with a prefix
app.include_router(signup_router, prefix="/auth", tags=["signup"])
app.include_router(login_router, prefix="/auth", tags=["login"])
app.include_router(predict_router, prefix="/api", tags=["predict"])

