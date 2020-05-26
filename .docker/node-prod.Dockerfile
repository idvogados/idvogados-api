FROM node:12.16.3-alpine

RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/app

COPY package.json .
RUN npm install --only=production
COPY . .

CMD ["npm", "start"]