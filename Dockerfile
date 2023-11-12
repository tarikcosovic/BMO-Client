FROM node:latest

WORKDIR /project

COPY . .
RUN npm install

EXPOSE 80
CMD ["npm", "start"]