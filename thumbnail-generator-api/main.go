package main

import (
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/nfnt/resize"
)

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func uploadFile(w http.ResponseWriter, r *http.Request) {
	// ParseMultipartForm parses a request body as multipart/form-data
	// File max 5MB
	r.ParseMultipartForm(5 << 20)

	// Retrieve the file from form data
	file, handler, err := r.FormFile("file")
	if err != nil {
		fmt.Fprintf(w, "Bad Request")
	}
	// Close the file when we finish
	defer file.Close()

	// Sizes (options) defined by the user on the UI
	// If no sizes (options) were passed then take the 3 formats by default
	var options string = r.FormValue("options")
	if options == "" {
		options = "400x300,160x120,120x120"
	}
	// Interpolation method defined by the user on the UI
	// If no sizes interpolation method were passed then take the default
	var interp string = r.FormValue("interpolation")
	var interpolation resize.InterpolationFunction
	switch interp {
	case "Bicubic":
		interpolation = resize.Bicubic
	case "Bilinear":
		interpolation = resize.Bilinear
	case "MitchellNetravali":
		interpolation = resize.MitchellNetravali
	case "NearestNeighbor":
		interpolation = resize.NearestNeighbor
	case "Lanczos2":
		interpolation = resize.Lanczos2
	case "Lanczos3":
	default:
		interpolation = resize.Lanczos3
	}

	// Take all the sizes to be resized
	var name []string = strings.Split(handler.Filename, ".")
	// Take the file extension
	var ext string = name[len(name)-1]

	// Compare and only allow extensions: png and jpg
	if strings.ToLower(name[len(name)-1]) != "png" && strings.ToLower(name[len(name)-1]) != "jpg" && strings.ToLower(name[len(name)-1]) != "jpeg" {
		fmt.Fprintf(w, "File extension should be png or jpg")
		return
	}

	// Compare and only allow files which size is less than 5MB
	if handler.Size > (5 << 20) {
		fmt.Fprintf(w, "File's size should be less than 5MB")
		return
	}

	// Generate an array of the sizes
	var sizes []string = strings.Split(options, ",")
	// Call function to resize the image and returns JSON with the URLs
	var resp string = resizeImage(ext, sizes, interpolation, name, &file, r.Host)
	// Check for error in resize function
	if resp == "" {
		fmt.Fprintf(w, "Error while resizing")
		return
	}
	// return the response of POST petition
	json.NewEncoder(w).Encode(resp)
}

func resizeImage(ext string, sizes []string, interpolation resize.InterpolationFunction, name []string, file *multipart.File, host string) string {
	// Initialize variables
	var img image.Image
	var errDecode error
	// Initialize JSON for the response
	var resp string = "{"

	// Decode the file to Image struct
	if ext != "png" {
		img, errDecode = jpeg.Decode(*file)
	} else {
		img, errDecode = png.Decode(*file)
	}
	// Check for errors
	if errDecode != nil {
		return ""
	}

	// Iterates over the sizes passed
	var top int = len(sizes)
	for i := 0; i < top; i++ {
		// Take the dimensions for the resize
		var dim []string = strings.Split(sizes[i], "x")
		// Parse string dimensions to int
		width, errW := strconv.Atoi(dim[0])
		if errW != nil {
			return ""
		}
		height, errH := strconv.Atoi(dim[1])
		if errH != nil {
			return ""
		}
		// Get the resized image
		newImg := resize.Resize(uint(width), uint(height), img, interpolation)
		// Generates the path to save the image resized
		var path string = os.Getenv("IMAGES_FOLDER") + "/" + name[0] + "_" + dim[0] + "x" + dim[1] + "." + ext
		// Create the file
		out, errFile := os.Create(path)
		if errFile != nil {
			return ""
		}
		// write new image to file
		if ext != "png" {
			jpeg.Encode(out, newImg, nil)
		} else {
			png.Encode(out, newImg)
		}
		// Close the file
		out.Close()
		// Complete JSON string for the response
		resp += `"` + sizes[i] + `":"` + host + "/" + path + `"`
		if i < top-1 {
			resp += ","
		}
	}
	resp += "}"
	// return JSON string
	return resp
}

func main() {
	fmt.Println("Server Start")

	router := mux.NewRouter().StrictSlash(true)
	// Welcome Endpoint
	router.HandleFunc("/", homeLink).Methods("GET")
	// set Endpoint to send the images to be resized
	router.HandleFunc(os.Getenv("ENDPOINT"), uploadFile).Methods("POST")
	// Set PATH to save images
	router.PathPrefix("/" + os.Getenv("IMAGES_FOLDER") + "/").Handler(http.StripPrefix("/"+os.Getenv("IMAGES_FOLDER")+"/", http.FileServer(http.Dir("./"+os.Getenv("IMAGES_FOLDER")+"/"))))

	// Set Headers, Origins and Methods allowed
	headers := handlers.AllowedHeaders([]string{"Access-Control-Allow-Origin", "Content-Type"})
	origins := handlers.AllowedOrigins([]string{"*"})
	methods := handlers.AllowedMethods([]string{"GET", "POST"})

	log.Fatal(http.ListenAndServe(":8081", handlers.CORS(origins, headers, methods)(router)))
}
