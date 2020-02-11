package handlr

import (
	"image"
	"image/jpeg"
	"image/png"
	"mime/multipart"
	"os"
	"strconv"
	"strings"

	"github.com/nfnt/resize"
)

// ResizeImage function that resize an Image with sizes and interpolation especified
func ResizeImage(ext string, sizes []string, interpolation resize.InterpolationFunction, name []string, file *multipart.File, host string) OkResponse {
	// Initialize variables
	var resp OkResponse
	var img image.Image
	var errDecode error

	// Decode the file to Image struct
	if ext != "png" {
		img, errDecode = jpeg.Decode(*file)
	} else {
		img, errDecode = png.Decode(*file)
	}
	// Check for errors
	if errDecode != nil {
		resp.Code = 500
		return resp
	}

	// Iterates over the sizes passed
	var top int = len(sizes)
	for i := 0; i < top; i++ {
		// Take the dimensions for the resize
		var dim []string = strings.Split(sizes[i], "x")
		// Parse string dimensions to int
		width, errW := strconv.Atoi(dim[0])
		if errW != nil {
			resp.Code = 500
			return resp
		}
		height, errH := strconv.Atoi(dim[1])
		if errH != nil {
			resp.Code = 500
			return resp
		}
		// Get the resized image
		newImg := resize.Resize(uint(width), uint(height), img, interpolation)
		// Generates the path to save the image resized
		var fileName string = name[0] + "_" + dim[0] + "x" + dim[1] + "." + ext
		var path string = os.Getenv("IMAGES_FOLDER") + "/" + fileName
		// Create the file
		out, errFile := os.Create(path)
		if errFile != nil {
			resp.Code = 500
			return resp
		}
		// write new image to file
		if ext != "png" {
			jpeg.Encode(out, newImg, nil)
		} else {
			png.Encode(out, newImg)
		}
		// Close the file
		out.Close()
		var image ImagesResp
		image.Name = fileName
		image.Path = host + "/" + path
		resp.Data = append(resp.Data, image)
	}
	// return OkResponse
	resp.Code = 200
	return resp
}
