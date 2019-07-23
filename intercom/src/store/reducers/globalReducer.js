import {
    SET_TOKEN,
    GET_USER,
    GET_USER_FAIL,
    LOGOUT,
    SET_USER
} from '../constants';

const initialState = {
    user: {},
    token: ''
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                error: ''
            };

        case GET_USER_FAIL:
            return {
                ...state,
                error: 'Failed to fetch user.'
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return state;

        default:
            return state;
    }
};
