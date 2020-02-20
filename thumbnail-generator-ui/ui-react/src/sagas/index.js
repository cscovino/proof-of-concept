import { all, fork } from 'redux-saga/effects';

import imagesSaga from './imagesSaga';

export default function* rootSaga() {
    yield all([
        fork(imagesSaga)
    ]);
}