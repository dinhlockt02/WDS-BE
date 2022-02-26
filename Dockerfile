FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV MONGOURI mongodb://mongodb:27017/bookStore
ENV PORT 3000

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]