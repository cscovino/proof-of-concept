import { LOAD_SUCCESS } from '../constants';

const imagesReducer = (state = {}, action) => {
    if (action.type === LOAD_SUCCESS) {
        return {...state, ...action.images};
    }
    return state;
};

export default imagesReducer;