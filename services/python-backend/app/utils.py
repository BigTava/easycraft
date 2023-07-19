import json
import os


def create_order_input(order: str) -> str:
    return f"""Choose the supplier that best matches this order. Return me a json following the format.
            Order: {order}.
            Suppliers:
            {str(json.load(open(os.path.join("static",
                                             "order_schema.json"))))}
            Format: {str(json.load(open(os.path.join("static",
                                             "format_schema.json"))))}"""