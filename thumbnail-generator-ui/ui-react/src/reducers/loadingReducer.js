import { LOAD, LOAD_SUCCESS, LOAD_FAILED } from '../constants';

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case LOAD:
            return true;
        case LOAD_SUCCESS:
            return false;
        case LOAD_FAILED:
            return false;
        default:
            return state;
    }
};

export default loadingReducer;