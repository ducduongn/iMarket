import { SET_FILTER, ADD_FILTER } from "../actionTypes";

const initialState = [];

const productFilter = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTER: {
            return action.payload.filter;
        }
        case ADD_FILTER: {
            return
            [...state, action.payload.filter]
        }
        default: {
            return state;
        }
    }
};

export default visibilityFilter;
