FROM node:latest
WORKDIR /usr/src/app
COPY package*.json .
COPY . .
EXPOSE 8089
RUN echo 'hello world'
RUN npm i -g prisma
RUN npm i -g graphql
RUN npm install
RUN prisma deploy
CMD ["npm", " start"]