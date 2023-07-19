FROM node:18.14.0-alpine

# set working directory
RUN mkdir -p /app/frontend
WORKDIR /app/frontend

# add `/app/ui-core/app/node_modules/.bin` to $PATH
ENV PATH /app/frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# start app
CMD ["npm", "start"]
