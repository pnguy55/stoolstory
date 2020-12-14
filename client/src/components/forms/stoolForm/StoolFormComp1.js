import React from 'react';

import M from "materialize-css";
import TextField from '@material-ui/core/TextField';

export default ({input, label, className, meta: { error, touched }}) => {
    return (
        <div className="stool-form-question">
            <label style={{fontSize: '2rem',
                            color: '#000000',
                            fontWeight: "800"}}>
                {label}
            </label>
            <TextField
                id="datetime-local"
                label="Press next if date/time is now."
                type="datetime-local"
                InputLabelProps={{
                shrink: true,
                }}
            />

            <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>

        </div>
        // ,
        // <div>
        //     <label style={{fontSize: '2rem',
        //                     color: '#000000',
        //                     fontWeight: "800"}}>
        //         {label}
        //     </label>
        //     <input type="text" className="timepicker" style={{marginBottom:'.2em'}} {...input}/>
        //     <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>

        // </div>
    );
}