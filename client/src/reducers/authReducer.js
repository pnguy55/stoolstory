import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        // remember to catch case of slow internet
        case FETCH_USER:
            console.log('authReducer', action.payload)
            return action.payload || false;
        default: 
            return state;
    }
}