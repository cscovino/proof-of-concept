import { LOAD, LOAD_SUCCESS, LOAD_FAILED } from '../constants';

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case LOAD_FAILED:
            return action.error;
        case LOAD:
        case LOAD_SUCCESS:
            return null;
        default:
            return state;
    }
};

export default errorReducer;