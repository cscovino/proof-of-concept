FROM golang:latest as build

RUN go get github.com/gorilla/handlers && \
    go get github.com/gorilla/mux && \
    go get github.com/nfnt/resize

RUN mkdir server
WORKDIR /server/
ADD main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -tags static_all -installsuffix cgo -o main .
RUN chmod +x main

FROM scratch

COPY --from=build /server/main .

EXPOSE 8081

CMD ["/main"]
