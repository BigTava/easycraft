FROM nvidia/cuda:12.2.0-runtime-ubuntu22.04

# set working directory
RUN mkdir -p /src
WORKDIR /src

COPY . .

# install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    python3.10 \
    python3-pip

# install python dependencies
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . .

ENTRYPOINT ["/src/entrypoint.sh"]


