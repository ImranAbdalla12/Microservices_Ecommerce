FROM node:alpine
WORKDIR /src
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD ["npm ","start"];