const resizeImage = async (payload) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('sizes', payload.sizes);
    formData.append('interpolation', payload.interpolation);
    const response = await fetch(process.env.REACT_APP_API, {
        method: 'POST',
        body: formData
    });
    return response.json();
}

export { resizeImage };