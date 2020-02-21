# Sinapsis Technical PoC
A Web App for a thumbnail generator.

## Requirements to run the Web App

To run this Web App you must have install these packages:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Running the Thumbnail Generator:

Once you have installed docker and docker compose you only have to run two commands:
```
docker-compose build
docker-compose up
```
Then the application will be running on the ports that you have had configured in the `.env` file:
```
REACT_APP_API=http://192.168.43.211
REACT_APP_API_PORT=8085
REACT_APP_UI_PORT=8084

API_PORT=8085
```
Where `REACT_APP_PI` is the host of the API, `REACT_APP_API_PORT=API_PORT` is the port that will be running the API and `REACT_APP_UI_PORT` is the port that will be hosting the react app.

Finally you can access the App navigating to the ip address of your server (the computer that is running the solution) with the ui port configured in the `.env` file.
