import torch
from transformers import pipeline


def verify_order(order: str):
   
    ans = pipeline(model="databricks/dolly-v2-3b", torch_dtype=torch.bfloat16,
                    trust_remote_code=True, device_map="auto")
    out = ans("What is the capital of India")

    return out
