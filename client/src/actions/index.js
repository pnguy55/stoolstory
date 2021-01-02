import axios from 'axios';
import { FETCH_USER, FETCH_LOG, FETCH_LOGS, DELETE_LOG } from './types';

// these are our action creators
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};


export const submitLog = (formValues, log_type, history) => async dispatch => {

    let { date_time, stool_type, pain_lvl, bloodiness } = formValues;

    const res = await axios.post('/api/stool/log', { 
        date_time,
        stool_type,
        pain_lvl,
        bloodiness,
        log_type,
    });

    console.log(res)
    dispatch({ type: FETCH_LOGS, payload: res.data });
    
    history.push('/business_analysis/p')
    // pushing to history for redirect purposes
};

export const fetchLog = () => async dispatch => {
    const res = await axios.get('/api/stool/log');
    
    dispatch({ type: FETCH_LOG, payload: res.data});
}

export const fetchLogs = () => async dispatch => {
    const res = await axios.get('/api/stool/logs');
    console.log(res.data)
    dispatch({ type: FETCH_LOGS, payload: res.data});
}

export const deleteLog = (logId, history) => async dispatch => {
    const res = await axios.delete(`/api/stool/logs/${logId}`);

    dispatch({ type: DELETE_LOG, payload: res.data});
}