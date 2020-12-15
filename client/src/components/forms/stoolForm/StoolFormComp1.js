import React from 'react';

import M from "materialize-css";
import TextField from '@material-ui/core/TextField';
import Helpers from '../../helpers/helpers';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  big_field: {
    height: '7rem',
  }
});

export default ({input, name, label, className, meta: { error, touched }}) => {
    const classes = useStyles();

    return (
        <div className="stool-form-question">
            <label style={{fontSize: '2rem',
                            color: '#000000',
                            fontWeight: "800"}}
                    to={name}>
                {label}
            </label>
            <TextField
                className={classes.big_field}
                id="datetime-local"
                label="When did you do the deed?"
                type="datetime-local"
                defaultValue={`${Helpers.formatMMDDYY(new Date)}T${Helpers.formatAMPM(new Date)}`}
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