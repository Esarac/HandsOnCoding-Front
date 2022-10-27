FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY .env ./
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

CMD ["npm", "run", "dev"]