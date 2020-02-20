import { LOAD, LOAD_SUCCESS, LOAD_FAILED, RESET } from '../constants';

const INITIAL_STATE = {
    images: [],
    isLoading: false,
    error: null
}

const imagesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD:
            return {
                ...INITIAL_STATE,
                isLoading: true
            }
        case LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                images: action.payload
            }
        case LOAD_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case RESET: 
            return INITIAL_STATE
        default:
            return state
    }
};

export default imagesReducer;