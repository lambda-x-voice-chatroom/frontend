import {
    SET_TOKEN,
    GET_USER,
    GET_USER_FAIL,
    LOGOUT,
    SET_USER,
    SET_GROUPS,
    SET_CURRENT_GROUP
} from '../constants';

const initialState = {
    user: {},
    token: '',
    currentGroup: '',
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
                groupsOwned: [...action.payload.owned],
                groupsBelongTo: [...action.payload.belonged],
                groupsInvited: [...action.payload.invited]
            };
        case SET_CURRENT_GROUP:
            return {
                ...state,
                currentGroup: action.payload
            };
        case LOGOUT:
            return { ...state, user: {}, token: '' };

        default:
            return state;
    }
};
