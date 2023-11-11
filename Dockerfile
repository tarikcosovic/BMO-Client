FROM node:latest

WORKDIR /project

COPY . .
RUN npm install

EXPOSE 4200
CMD ["npm", "start"]