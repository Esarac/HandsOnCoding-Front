FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY .env.local ./
RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]