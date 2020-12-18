import React from 'react';

import M from "materialize-css";
import TextField from '@material-ui/core/TextField';
import Helpers from '../../helpers/helpers';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  big_field: {
    '&>div>input' : {     
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',       
        height: '7rem',
    },
  },
  form_question: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  },
  form_label: {
    fontSize: '3rem',
    color: '#000000',
    fontWeight: "800"
  },
  label:{
    fontSize: '1.5rem'
  }
});

export default ({input, name, label, className, meta: { error, touched }}) => {
    const classes = useStyles();

    return (
        <div className={classes.form_question}>
            <label className={classes.form_label}
                    to={name}>
                {label}
            </label>
            <TextField
                className={classes.big_field}
                {...input}
                id="datetime-local"
                label="When did you do the deed?"
                type="datetime-local"
                size="medium"
                variant='standard'
                // defaultValue={`${Helpers.formatMMDDYY(new Date)}T${Helpers.formatAMPM(new Date)}`}
                InputLabelProps={{
                className: classes.label
                  }
                }
                /* styles the input component */
                inputProps={{
                    style: {
                        height: '5rem',
                        padding: '0 14px',
                    },
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