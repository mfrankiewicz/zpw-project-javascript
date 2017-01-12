FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./start.sh /start.sh

EXPOSE 80
CMD [ "bash", "/start.sh" ]
