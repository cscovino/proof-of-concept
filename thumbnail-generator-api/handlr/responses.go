package handlr

// OkResponse body for Ok response
type OkResponse struct {
	Code int          `json:"code"`
	Data []ImagesResp `json:"imagesResp"`
}

// ImagesResp object for images
type ImagesResp struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

// ErrorResponse body for errors responses
type ErrorResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
