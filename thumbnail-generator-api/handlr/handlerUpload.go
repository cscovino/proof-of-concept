package handlr

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/nfnt/resize"
)

// UploadFile handler function for POST petitions
func UploadFile(w http.ResponseWriter, r *http.Request) {
	// swagger:route POST /upload upload
	//
	// Process file and generates Thumbnails
	//
	// Consumes:
	//  - multipart/form-data
	//
	// Produces:
	//  - application/json
	//
	// Schemes: http
	//
	// Responses:
	//  500: errorResponse
	//  200: okResponse

	// ParseMultipartForm parses a request body as multipart/form-data
	// File max 5MB
	// r.ParseMultipartForm(5 << 20)

	// Retrieve the file from form data
	file, handler, err := r.FormFile("file")
	if err != nil {
		fmt.Println("ERROR FILE: ", err)
		var resp = ErrorResponse{
			Code:    400,
			Message: "Couldn't Get the File",
		}
		json.NewEncoder(w).Encode(resp)
		return
	}
	// Close the file when we finish
	defer file.Close()

	// Take all the sizes to be resized
	var name []string = strings.Split(handler.Filename, ".")
	// Take the file extension
	var ext string = name[len(name)-1]

	// Compare and only allow extensions: png and jpg
	if strings.ToLower(name[len(name)-1]) != "png" && strings.ToLower(name[len(name)-1]) != "jpg" && strings.ToLower(name[len(name)-1]) != "jpeg" {
		fmt.Println("ERROR EXTENSION FILE")
		var resp = ErrorResponse{
			Code:    400,
			Message: "File extension not supported, only works with png and jpg!",
		}
		json.NewEncoder(w).Encode(resp)
		return
	}

	// Compare and only allow files which size is less than 5MB
	if handler.Size > (5 << 20) {
		fmt.Println("ERROR SIZE FILE")
		var resp = ErrorResponse{
			Code:    400,
			Message: "It's a big file!, it should be less than 5MB",
		}
		json.NewEncoder(w).Encode(resp)
		return
	}

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

	// Generate an array of the sizes
	var sizes []string = strings.Split(options, ",")
	// Call function to resize the image and returns JSON with the URLs
	var resp OkResponse = ResizeImage(ext, sizes, interpolation, name, &file, r.Host)
	// Check for error in resize function
	if resp.Code == 500 {
		fmt.Println("ERROR RESIZE FILE")
		var resp = ErrorResponse{
			Code:    500,
			Message: "Resize Image Failed!",
		}
		json.NewEncoder(w).Encode(resp)
		return
	}
	// return the response of POST petition
	json.NewEncoder(w).Encode(resp)
	return
}
