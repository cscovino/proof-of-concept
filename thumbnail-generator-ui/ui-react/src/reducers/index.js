import { combineReducers } from 'redux';

import imagesReducer from './imagesReducer';

const rootReducer = combineReducers({
    imagesReducer,
});
export default rootReducer;