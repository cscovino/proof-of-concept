FROM golang:latest as build

RUN go get github.com/gorilla/handlers && \
    go get github.com/gorilla/mux && \
    go get github.com/nfnt/resize && \
    go get github.com/go-openapi/runtime/middleware && \
    go get github.com/cscovino/proof-of-concept/thumbnail-generator-api/handlr

RUN mkdir server
WORKDIR /server/
ADD main.go .
ADD swagger.yaml .
RUN CGO_ENABLED=0 GOOS=linux go build -a -tags static_all -installsuffix cgo -o main .
RUN chmod +x main

FROM scratch

COPY --from=build /server/main .
COPY --from=build /server/swagger.yaml .

EXPOSE ${API_PORT}

CMD ["/main"]
