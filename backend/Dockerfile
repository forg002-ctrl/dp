FROM node:16
EXPOSE 3001

WORKDIR /src

COPY package.json .
COPY node_modules ./node_modules
COPY dist ./dist
COPY dockerrun.sh .

CMD ["./dockerrun.sh"]