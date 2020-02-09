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
	//ParseMultipartForm parses a request body as multipart/form-data
	r.ParseMultipartForm(5 << 20)

	file, handler, err := r.FormFile("file") // Retrieve the file from form data
	if err != nil {
		fmt.Fprintf(w, "Bad Request")
	}
	defer file.Close() // Close the file when we finish

	var options string = r.FormValue("options")
	if options == "" {
		options = "400x300,160x120,120x120"
	}

	var name []string = strings.Split(handler.Filename, ".")
	var ext string = name[len(name)-1]

	if strings.ToLower(name[len(name)-1]) != "png" && strings.ToLower(name[len(name)-1]) != "jpg" && strings.ToLower(name[len(name)-1]) != "jpeg" {
		fmt.Fprintf(w, "File extension should be png or jpg")
		return
	}

	if handler.Size > (5 << 20) {
		fmt.Fprintf(w, "File should be less than 5MB")
		return
	}
	var sizes []string = strings.Split(options, ",")
	var resp string = resizeImage(ext, sizes, name, &file, r.Host)

	if resp == "" {
		fmt.Fprintf(w, "Error while resizing")
		return
	}
	json.NewEncoder(w).Encode(resp)
}

func resizeImage(ext string, sizes []string, name []string, file *multipart.File, host string) string {
	var img image.Image
	var errDecode error
	var resp string = "{"

	if ext != "png" {
		img, errDecode = jpeg.Decode(*file)
	} else {
		img, errDecode = png.Decode(*file)
	}
	if errDecode != nil {
		return ""
	}

	var top int = len(sizes)
	for i := 0; i < top; i++ {
		var dim []string = strings.Split(sizes[i], "x")
		width, errW := strconv.Atoi(dim[0])
		if errW != nil {
			return ""
		}
		height, errH := strconv.Atoi(dim[1])
		if errH != nil {
			return ""
		}
		newImg := resize.Resize(uint(width), uint(height), img, resize.Lanczos3)
		var path string = os.Getenv("IMAGES_FOLDER") + "/" + name[0] + "_" + dim[0] + "x" + dim[1] + "." + ext
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
		out.Close()
		resp += `"` + sizes[i] + `":"` + host + "/" + path + `"`
		if i < top-1 {
			resp += ","
		}
	}
	resp += "}"
	return resp
}

func main() {
	fmt.Println("Server Start")

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink).Methods("GET")
	router.HandleFunc(os.Getenv("ENDPOINT"), uploadFile).Methods("POST")
	router.PathPrefix("/" + os.Getenv("IMAGES_FOLDER") + "/").Handler(http.StripPrefix("/"+os.Getenv("IMAGES_FOLDER")+"/", http.FileServer(http.Dir("./"+os.Getenv("IMAGES_FOLDER")+"/"))))

	headers := handlers.AllowedHeaders([]string{"Access-Control-Allow-Origin", "Content-Type"})
	origins := handlers.AllowedOrigins([]string{"*"})
	methods := handlers.AllowedMethods([]string{"GET", "POST"})

	log.Fatal(http.ListenAndServe(":8081", handlers.CORS(origins, headers, methods)(router)))
}
