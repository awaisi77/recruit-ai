
FROM node:17
WORKDIR /app
ARG CACHEBUST=1 
RUN echo $CACHEBUST
COPY package*.json /app/
RUN npm install
COPY . /app

EXPOSE 4008
CMD [ "npm", "start" ]


