FROM node:19

RUN mkdir -p /home/super-app-back

COPY . /home/super-app-back
WORKDIR /home/super-app-back

RUN npm install
RUN npm install -g sequelize-cli

EXPOSE 3000

CMD [ "npm", "start" ]