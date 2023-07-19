import json
import os
import subprocess
import time

import requests
from app.exceptions import ErrorGeneratingText
from app.utils import create_order_input

order_schema = json.load(open(os.path.join("static", "order_schema.json")))


def call_prompt(input: str):
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
            return response.json()

        case 401:
            raise ErrorGeneratingText


async def ask_feedback(order: str):
    input = """Do you have enough information to match this order schema?
             Please answer yes or no following the explanation."""
    
    input = input + "The schema is" + str(order_schema) + "The order is" + order

    return call_prompt(input)


async def convert_order_into_json(order: str):
    input = """Return me a json following this format ?
             Please answer yes or no following the explanation."""
    order_schema = json.load(open(os.path.join("static", "order_schema.json")))
    input = input + "The schema is" + str(order_schema) + "The order is" + order

    return call_prompt(input)


async def run_in_bacalhau(order: str):
    input = create_order_input(order)

    command = (
        "bacalhau docker run jsacex/dolly_inference:latest ",
        "-w /inputs",
        "-i gitlfs://huggingface.co/databricks/dolly-v2-3b.git",
        "-i https://gist.githubusercontent.com/js-ts/d35e2caa98b1c9a8f176b0b877e0c892/raw/3f020a6e789ceef0274c28fc522ebf91059a09a9/inference.py \
jsacex/dolly_inference:latest",
        f"-- python inference.py --prompt '{input}' --model_version './databricks/dolly-v2-3b'"
    )
    process = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    job_id = process.stdout.split()[-1]

    while True:
        status_command = f"bacalhau list --id-filter {job_id}"
        process = subprocess.run(status_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        if 'Completed' in process.stdout:
            break
        time.sleep(5)  # wait for 5 seconds before checking again

    os.makedirs(os.path.join("tmp", f"{job_id}"), exist_ok=True)

    # download the job result
    download_command = f"bacalhau get {job_id} --output-dir {os.path.join('tmp', f'{job_id}')}"
    subprocess.run(download_command, shell=True)

    with open(os.path.join('tmp', f'{job_id}', 'stdout')) as f:
        result = f.read()

    return result

