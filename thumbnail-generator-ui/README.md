# PoC: Thumbnail Generator UI

A simple UI for a thumbnail generator.

### Requirements to run the UI

To run this UI you must have install either of this packages:
- [Docker](https://www.docker.com/)
- [Nodejs](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Running the UI with Docker

First of all you will need have Docker installed, if you do not have it you can search it [here](https://www.docker.com/get-started). 

Once you have Docker installed you only need run two commands (inside de folder `proof-of-concept/thumbnail-generator-ui`), one for build the docker image and the other to run the image:
```
export IMAGE_NAME=ui-react
export REACT_APP_API=192.168.43.211
export REACT_APP_API_PORT=8085
export REACT_APP_UI_PORT=8084
export EXTERNAL_PORT=$REACT_APP_UI_PORT
export INTERNAL_PORT=$REACT_APP_UI_PORT

docker build --build-arg REACT_APP_API=$REACT_APP_API --build-arg REACT_APP_API_PORT=$ --build-arg REACT_APP_UI_PORT=$REACT_APP_UI_PORT -t $IMAGE_NAME .
docker run -p $EXTERNAL_PORT:$INTERNAL_PORT $IMAGE_NAME
```
Where `$IMAGE_NAME` is the name that you want to call de image, the `$EXTERNAL_PORT` is the port that you can access from external device and `$INTERNAL_PORT` is the port defined in the Dockerfile.

## Running the UI with Node and Yarn

First of all you will need have Node and Yarn installed, if you do not have it you can search it [here](https://nodejs.org/) and [here](https://classic.yarnpkg.com/en/docs/install). 

Once you have Node and Yarn installed you need run the following command (inside de folder `proof-of-concept/thumbnail-generator-ui`) to install the required packages:
```
yarn global add serve
yarn install
```
Then have to run the commands below to build the react project:
```
export REACT_APP_API=192.168.43.211
export REACT_APP_API_PORT=8085
export REACT_APP_UI_PORT=8084

yarn build
```
Where `$REACT_APP_API` is the ip address where is running the API, `$REACT_APP_API_PORT` is the port where is running the API and `REACT_APP_UI_PORT` is the port that will run the react app.
Finally you have to run the next command:
```
serve -s build -l $REACT_APP_UI_PORT
```
Now you acces to your react app from `localhost:8084`, in this case.
