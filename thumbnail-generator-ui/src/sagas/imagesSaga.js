import { put, takeLatest, call, delay } from 'redux-saga/effects';

import { LOAD, LOAD_SUCCESS, LOAD_FAILED } from '../constants';
import { resizeImage } from '../api';

function* handleImagesLoad(action) {
    try {
        const response = yield call(resizeImage, action.payload);
        if(response.code !== 200){
            yield delay(500)
            yield put({ type: LOAD_FAILED, payload: response });
        } else {
            yield delay(500)
            yield put({ type: LOAD_SUCCESS, payload: response.imagesResp });
        }
    } catch (err) {
        yield put({ type: LOAD_FAILED, payload: {code: 400, message: err.message} });
    }
}

export default function* watchImagesLoad() {
    yield takeLatest(LOAD, handleImagesLoad);
}