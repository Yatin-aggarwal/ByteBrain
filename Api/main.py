from fastapi import FastAPI,Form, Request
from pydantic import BaseModel, Json
from typing import Annotated, Any
from Hate_speech import speech_check
import json
from fastapi.middleware.cors import CORSMiddleware
from Database.insert import InsertBlog
from sockets import sio_app
import uvicorn


class blog(BaseModel):
    data:Json[Any]


app = FastAPI()

app.mount('/',app=sio_app)

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8020,lifespan="on")
