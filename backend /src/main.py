from fastapi import FastAPI, Request
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from DefiAgent.agents import detect_intent, defi_analysis, normal_query
import json
import requests
import os

load_dotenv() 
app = FastAPI()

origins = [
    "*"
]
allow_credentials = True
allow_methods = ["*"]
allow_headers = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=allow_credentials, allow_methods=allow_methods, allow_headers=allow_headers)
base_url = "http://localhost:8000"

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    prompt = body["prompt"]
    response = await detect_intent(prompt)
    data = json.loads(response)
    print(data)
    if data['action'] != 'other':
        if data['action'] == 'analyze':
            response = defi_analysis(prompt)
            data = json.loads(response)
            print(data)
            return data
        if data['action'] == 'bridge':
            # data = bridge_sonic_to_sepolia(data['parameters'][2], data['parameters'][3])
            
            # return data
            pass
        response = normal_query(prompt)
        print(response)
        return response
    else:
        response = normal_query(prompt)
        return response
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
