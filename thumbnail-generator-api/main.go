// Package Server Thumbnail Generator API
//
// Documentation for Thumbnail Generator API
//
// Schemes: http
// BasePath: /
// Version: 1.0.0
//
// Consumes:
// - multipart/form-data
//
// Produces:
// - application/json
// swagger:meta
package main

import (
	"fmt"
	"log"
	"mime/multipart"
	"net/http"

	"./handlr"
	"github.com/go-openapi/runtime/middleware"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Ok response
// swagger:response okResponse
type OkResponse struct {
	// Ok response
	// in: body
	Body handlr.OkResponse
}

// Error response
// swagger:response errorResponse
type ErrorResponse struct {
	// Error response
	// in: body
	Body handlr.ErrorResponse
}

// swagger:parameters attributes
type FormData struct {
	// Upload POST attributes
	// in: body
	Body struct {
		File          multipart.File
		Sizes         string
		Interpolation string
	}
}

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func main() {
	fmt.Println("Server Start")

	router := mux.NewRouter().StrictSlash(true)
	// Welcome Endpoint
	router.HandleFunc("/", homeLink).Methods("GET")
	// set Endpoint to send the images to be resized
	router.HandleFunc("/upload", handlr.UploadFile).Methods("POST")
	// Set PATH to save images
	router.PathPrefix("/images/").Handler(http.StripPrefix("/images/", http.FileServer(http.Dir("./images/"))))

	// handler for documentation
	opts := middleware.RedocOpts{SpecURL: "/swagger.yaml"}
	sh := middleware.Redoc(opts, nil)

	getR := router.Methods(http.MethodGet).Subrouter()
	getR.Handle("/docs", sh)
	getR.Handle("/swagger.yaml", http.FileServer(http.Dir("./")))

	// Set Headers, Origins and Methods allowed
	headers := handlers.AllowedHeaders([]string{"Access-Control-Allow-Origin", "Content-Type"})
	origins := handlers.AllowedOrigins([]string{"*"})
	methods := handlers.AllowedMethods([]string{"GET", "POST"})

	log.Fatal(http.ListenAndServe(":8081", handlers.CORS(origins, headers, methods)(router)))
}
