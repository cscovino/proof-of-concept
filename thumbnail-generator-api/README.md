# PoC: Thumbnail Generator API

A simple API that generates thumbnails from a source image.

### Requirements to run the API

To run this API you must have install either of this packages:
- [Docker](https://www.docker.com/)
- [Go](https://golang.org/)

## Running the Api with Docker

First of all you will need have Docker installed, if you do not have it you can search it [here](https://www.docker.com/get-started). 

Once you have Docker installed you only need run two commands (inside de folder `proof-of-concept/thumbnail-generator-api`), one for build the docker image and the other to run the image:
```
export IMAGE_NAME=api-go
export EXTERNAL_PORT=8081
export INTERNAL_PORT=8081

docker build -t $IMAGE_NAME .
docker run -p $EXTERNAL_PORT:$INTERNAL_PORT --env API_PORT=$INTERNAL_PORT $IMAGE_NAME
```
Where `$IMAGE_NAME` is the name that you want to call de image, the `$EXTERNAL_PORT` is the port that you can access from external device and `$INTERNAL_PORT` is the port defined in the Dockerfile.

## Running the Api with Go

First of all you will need have Go installed, if you do not have it you can search it [here](https://golang.org/dl/). 

Once you have Go installed you need run the following commands to install the required packages:
```
go get github.com/gorilla/handlers && \
go get github.com/gorilla/mux && \
go get github.com/nfnt/resize && \
go get github.com/go-openapi/runtime/middleware && \
go get github.com/cscovino/proof-of-concept/thumbnail-generator-api/handlr
```
Then have to run the command (inside de folder `proof-of-concept/thumbnail-generator-api`) below to compile the code and generate the executable:
```
go build -a -tags static_all -installsuffix cgo -o $EXEC_NAME .
```
Where `$EXEC_NAME` is the name that you want to call de executable that wil run the server, for example: `thumbnail-generator`.
Then on Unix systems you have to otorgate the permissions to execute the binary:
```
chmod +x $EXEC_NAME
```
Finally you run the executable and you will have running the thumbnail generate api:
```
./$EXEC_NAME
```

## API Documentation

Once you have the server running you can see the documentation in the endpoint `/docs`.
Suppose the server is running on localhost port 8081, you wil find the documentation on `localhost:8081/docs`.

**Note**: you must have internet connection to see the documentation.
