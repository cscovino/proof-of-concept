import { LOAD, LOAD_SUCCESS, LOAD_FAILED } from "../constants";

const loadImages = () => ({
    type: LOAD,
});

const setImages = images => ({
    type: LOAD_SUCCESS,
    images,
});

const setError = error => ({
    type: LOAD_FAILED,
    error,
});

export { loadImages, setImages, setError };