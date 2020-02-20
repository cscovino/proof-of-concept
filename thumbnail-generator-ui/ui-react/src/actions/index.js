import { LOAD, LOAD_SUCCESS, LOAD_FAILED, RESET } from "../constants";

const loadImages = (payload) => ({
    type: LOAD,
    payload: payload
});

const setImages = payload => ({
    type: LOAD_SUCCESS,
    payload: payload
});

const setError = payload => ({
    type: LOAD_FAILED,
    payload: payload
});

const resetImages = () => ({
    type: RESET
});

export { loadImages, setImages, setError, resetImages };