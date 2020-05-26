FROM node:12.16.3

WORKDIR /var/app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]
