import json
import os

import requests
from app.exceptions import ErrorGeneratingText


async def run_prompt(input: str):
    url = "https://egrgbdt5yfhe8xdw.us-east-1.aws.endpoints.huggingface.cloud"
    access_token = os.getenv("HUGGING_FACE_ACCESS_TOKEN")
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    data = {
        "inputs": input
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    match response.status_code:
        case 200:
            print(response.json())
            return response.json()[0]["generated_text"]
        
        case 401:
            raise ErrorGeneratingText

    return response.json()["generated_text"]
