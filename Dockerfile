FROM node:latest

RUN apt-get update && apt-get install -y git &&\
    git clone https://github.com/robbelouwet/sportify.git &&\
    cd sportify && npm install

EXPOSE 3000
