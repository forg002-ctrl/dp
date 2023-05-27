FROM node:16

WORKDIR /frontend
COPY package.json .
RUN npm install

COPY . .
EXPOSE 3002

CMD ["npm", "start"]