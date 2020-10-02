import { ADD_TO_FILTER } from './actionTypes'

export const addToFilter = content => ({
    type: ADD_TO_FILTER,
    payload: {
        content
    }
})

