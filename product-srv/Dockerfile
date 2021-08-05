FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --save
COPY  . . 
EXPOSE 4001
CMD ["npm", "run", "server"]