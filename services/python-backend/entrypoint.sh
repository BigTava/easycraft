#!/bin/bash

uvicorn app.main:app --reload --workers 1 --host 0.0.0.0 --port 8000

exec "$@"
