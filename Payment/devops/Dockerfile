
FROM node:13.7.0
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app

EXPOSE 4008
CMD [ "npm", "start" ]


# docker build -f devops/Dockerfile . -t nivoda/nivoda-accountingservice
#docker run -d -p 4001:4001 --net="host" nivoda/nivoda-accountingservice 
#sudo docker tag 3bcb5fb55afe 676625059805.dkr.ecr.eu-west-2.amazonaws.com/nivoda-accountingservice:dev
#sudo docker push 676625059805.dkr.ecr.eu-west-2.amazonaws.com/nivoda-accountingservice:dev 