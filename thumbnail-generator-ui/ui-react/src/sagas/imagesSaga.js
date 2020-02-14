import { put, takeLatest } from 'redux-saga/effects';

import { LOAD, LOAD_SUCCESS, LOAD_FAILED } from '../constants';
import { resizeImage } from '../api';

export function* handleImagesLoad() {
    try {
        const response = yield call(resizeImage);
        if(response.code !== 200){
            yield put({ type: LOAD_FAILED, payload: response.message });
        } else {
            yield put({ type: LOAD_SUCCESS, payload: response.imagesResp });
        }
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error });
    }
}

export default function* watchImagesLoad() {
    yield takeLatest(LOAD, handleImagesLoad);
}