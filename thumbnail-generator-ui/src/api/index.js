const resizeImage = async (payload) => {
    console.log(process.env.REACT_APP_API)
    console.log(process.env.REACT_APP_API_PORT)
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('sizes', payload.sizes);
    formData.append('interpolation', payload.interpolation);
    const response = await fetch(
        process.env.REACT_APP_API + ":" + process.env.REACT_APP_API_PORT + "/upload", 
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method: 'POST',
            body: formData
        }
    );
    return response.json();
}

export { resizeImage };
