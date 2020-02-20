const resizeImage = async (payload) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('sizes', payload.sizes);
    formData.append('interpolation', payload.interpolation);
    const response = await fetch(/*process.env.REACT_APP_API*/window.location.href.replace(/0\b/g, "1") + "upload", 
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