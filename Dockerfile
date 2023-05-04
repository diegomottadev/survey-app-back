FROM node:19

RUN mkdir -p /home/survey-app-back

COPY . /home/survey-app-back
WORKDIR /home/survey-app-back

RUN npm install
RUN npm install -g sequelize-cli

EXPOSE 3000

CMD [ "npm", "start" ]
