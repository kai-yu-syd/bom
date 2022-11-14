FROM --platform=linux/amd64 node:14.17.0-alpine

WORKDIR /app
ADD index.js BomWeatherAdaptor.js package.json ./

RUN npm install
CMD node index.js