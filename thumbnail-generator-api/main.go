package main

import (
	"encoding/json"
	"fmt"
	"image/jpeg"
	"image/png"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/nfnt/resize"
)

type response struct {
	Orig string `json:"orig"`
	R400 string `json:"r400"`
	R160 string `json:"r160"`
	R120 string `json:"r120"`
}

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

	name := strings.Split(handler.Filename, ".")

	if strings.ToLower(name[len(name)-1]) != "png" && strings.ToLower(name[len(name)-1]) != "jpg" && strings.ToLower(name[len(name)-1]) != "jpeg" {
		fmt.Fprintf(w, "File extension should be png or jpg")
		return
	}

	if handler.Size > (5 << 20) {
		fmt.Fprintf(w, "File should be less than 5MB")
		return
	}

	var ext string

	if strings.ToLower(name[len(name)-1]) == "png" {
		img, errDecode := png.Decode(file)
		if errDecode != nil {
			fmt.Fprintf(w, "Bad Image")
		}

		out, errFile := os.Create("images/" + name[0] + ".png")
		if errFile != nil {
			fmt.Fprintf(w, "Error creating file")
		}
		defer out.Close()
		// write new image to file
		png.Encode(out, img)

		img400 := resize.Resize(400, 300, img, resize.Lanczos3)
		out400, errFile400 := os.Create("images/" + name[0] + "_400x300.png")
		if errFile400 != nil {
			fmt.Fprintf(w, "Error creating file")
		}
		defer out400.Close()
		// write new image to file
		png.Encode(out400, img400)

		img160 := resize.Resize(160, 120, img, resize.Lanczos3)
		out160, errFile160 := os.Create("images/" + name[0] + "_160x120.png")
		if errFile160 != nil {
			fmt.Fprintf(w, "Error creating file")
		}
		defer out160.Close()
		// write new image to file
		png.Encode(out160, img160)

		img120 := resize.Resize(120, 120, img, resize.Lanczos3)
		out120, errFile120 := os.Create("images/" + name[0] + "_120x120.png")
		if errFile120 != nil {
			fmt.Fprintf(w, "Error creating file")
		}
		defer out120.Close()
		// write new image to file
		png.Encode(out120, img120)

		ext = "png"
	} else {
		img, errDecode := jpeg.Decode(file)
		if errDecode != nil {
			fmt.Fprintf(w, "Bad Image")
		}

		out, errFile := os.Create("images/" + name[0] + ".jpg")
		if errFile != nil {
			fmt.Fprintf(w, "Error creating file")
		}
		defer out.Close()
		// write new image to file
		jpeg.Encode(out, img, nil)

		img400 := resize.Resize(400, 300, img, resize.Lanczos3)
		out400, errFile400 := os.Create("images/" + name[0] + "_400x300.jpg")
		if errFile400 != nil {
			fmt.Fprintf(w, "Error creating file")
		}
		defer out400.Close()
		// write new image to file
		jpeg.Encode(out400, img400, nil)

		img160 := resize.Resize(160, 120, img, resize.Lanczos3)
		out160, errFile160 := os.Create("images/" + name[0] + "_160x120.jpg")
		if errFile160 != nil {
			fmt.Fprintf(w, "Error creating file")
		}
		defer out160.Close()
		// write new image to file
		jpeg.Encode(out160, img160, nil)

		img120 := resize.Resize(120, 120, img, resize.Lanczos3)
		out120, errFile120 := os.Create("images/" + name[0] + "_120x120.jpg")
		if errFile120 != nil {
			fmt.Fprintf(w, "Error creating file")
		}
		defer out120.Close()
		// write new image to file
		jpeg.Encode(out120, img120, nil)

		ext = "jpg"
	}

	var resp = response{
		Orig: r.Host + "/images/" + handler.Filename,
		R400: r.Host + "/images/" + name[0] + "_400x300." + ext,
		R160: r.Host + "/images/" + name[0] + "_160x120." + ext,
		R120: r.Host + "/images/" + name[0] + "_120x120." + ext,
	}
	json.NewEncoder(w).Encode(resp)
}

func main() {
	fmt.Println("Server Start")

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink).Methods("GET")
	router.HandleFunc("/upload", uploadFile).Methods("POST")
	router.PathPrefix("/images/").Handler(http.StripPrefix("/images/", http.FileServer(http.Dir("./images/"))))

	headers := handlers.AllowedHeaders([]string{"Access-Control-Allow-Origin", "Content-Type"})
	origins := handlers.AllowedOrigins([]string{"*"})
	methods := handlers.AllowedMethods([]string{"GET", "POST"})

	log.Fatal(http.ListenAndServe(":8081", handlers.CORS(origins, headers, methods)(router)))
}
