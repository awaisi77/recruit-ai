
FROM node:17
WORKDIR /home/app
RUN npm install -g nodemon
COPY entrypoint.sh /entrypoint.sh
EXPOSE 4008
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
CMD [ "nodemon", "index.js" ]

