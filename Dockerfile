FROM node:latest
WORKDIR /app
ADD . .
RUN npm install package.json
CMD node server.js
