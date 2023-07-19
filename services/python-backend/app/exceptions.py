from fastapi import HTTPException, status


class ErrorGeneratingText(HTTPException):
    def __init__(self):
        self.status_code = status.HTTP_404_NOT_FOUND
        self.detail = "Error generating text."


class NotFound(HTTPException):
    def __init__(self):
        self.status_code = status.HTTP_404_NOT_FOUND
        self.detail = "Not found"