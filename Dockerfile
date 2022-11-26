USER sportscoach

RUN apt-get update && apt-get install -y git\
    && cd /home && sudo git clone https://github.com/robbelouwet/sportify.git
    && cd /sportify && sudo npm run start

EXPOSE 3000
