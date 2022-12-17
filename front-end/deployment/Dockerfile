FROM node:latest

ADD ${PWD}/id_rsa /id_rsa

RUN apt-get update && apt-get install -y git ssh &&\
    mkdir -p /root/.ssh && touch /root/.ssh/known_hosts &&\
    ssh-keyscan github.com >> /root/.ssh/known_hosts && chmod 600 /id_rsa &&\
    GIT_SSH_COMMAND="ssh -i /id_rsa -F /dev/null" git clone git@github.com:robbelouwet/sportify.git &&\
    cd sportify && npm install

EXPOSE 3000
