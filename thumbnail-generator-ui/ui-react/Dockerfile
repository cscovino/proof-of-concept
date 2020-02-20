FROM node:alpine
WORKDIR /app/

COPY package.json .

RUN npm install -g serve
RUN yarn install

ADD public public
ADD src src

EXPOSE 8080

RUN yarn build

CMD ["serve", "-s", "build", "-l", "8080"]