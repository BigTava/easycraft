FROM python:3.10.1-slim-buster

RUN mkdir -p /src
WORKDIR /src

COPY ./requirements.txt .
COPY ./entrypoint.sh .
COPY . .

# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql curl \
  && apt-get clean

# install python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Install Docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh \
  && sh get-docker.sh

# Install Bacalhau
RUN curl -sL https://get.bacalhau.org/install.sh | bash

# add entrypoint.sh
RUN chmod +x /src/entrypoint.sh

# run entrypoint.sh
ENTRYPOINT ["/src/entrypoint.sh"]
