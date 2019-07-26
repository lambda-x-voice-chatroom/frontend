import {
    SET_TOKEN,
    GET_USER,
    GET_USER_FAIL,
    LOGOUT,
    SET_USER,
    SET_GROUPS
} from '../constants';

const initialState = {
    user: {},
    token: '',
    groups: [],
    groupsOwned: [],
    groupsBelongTo: [],
    groupsInvited: []
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
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
        case SET_GROUPS:
            return {
                ...state,
                groups: action.payload
            };
        case LOGOUT:
            return { ...state, user: {}, token: action.payload };

        default:
            return state;
    }
};
