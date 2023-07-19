import requests
from app.exceptions import NotFound


def read_suppliers_from_certamic_db():
    url = "http://localhost:3333/suppliers"
    
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.get(url, headers=headers)

    match response.status_code:
        case 200:
            return response.json()

        case 401:
            raise NotFound