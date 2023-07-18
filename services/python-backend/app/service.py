import json
import os

import requests


async def run_prompt(input: str):
    url = "https://egrgbdt5yfhe8xdw.us-east-1.aws.endpoints.huggingface.cloud"
    headers = {
        "Authorization": os.getenv("HUGGING_FACE_ACCESS_TOKEN"),
        "Content-Type": "application/json"
    }
    data = {
        "inputs": input
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    return response.json()