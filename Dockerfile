FROM node:18.15.0

WORKDIR /supermarket

COPY . /supermarket

RUN npm install -g serve
RUN npm install
RUN npm run build 


CMD ["serve", "-s", "build"]

