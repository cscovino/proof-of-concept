import { put, call, takeEvery, select } from 'redux-saga/effects';

import { setImages, setError } from '../actions';
import { LOAD, LOAD_SUCCESS, LOAD_FAILED } from '../constants';
import { fetchImages } from '../api';

export function* handleImagesLoad() {
    try {
        const page = yield select(getPage);
        const images = yield call(fetchImages, page);
        yield put(setImages(images));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchImagesLoad() {
    yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}