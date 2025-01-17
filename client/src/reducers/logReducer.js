import { FETCH_LOG, FETCH_LOGS, DELETE_LOG } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_LOG:
            return action.payload;
        case FETCH_LOGS:
            return action.payload;
        case DELETE_LOG:
            return action.payload
        default:
            return state;
    }
}