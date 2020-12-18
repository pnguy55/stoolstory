import React, { useState } from 'react';

import M from "materialize-css";
import TextField from '@material-ui/core/TextField';
import Helpers from '../../helpers/helpers';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  big_field: {
    '&>div>input' : {     
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',       
        height: '7rem',
    }
  }
});

export default ({input, name, label, className, meta: { error, touched }}) => {
    const classes = useStyles();

    const [yes, setYes] = useState(false);
    const [no, setNo] = useState(input);

    function toggleButtons(yes_or_no) {
        switch(yes_or_no) {
            case 1:
                setYes(!yes);
                setNo(!no);
                input = true;
                touched = true;
                break;
            default:
                setYes(!yes);
                setNo(!no);                
                input = false;
                touched = true;
                break;
        }

    }
    return (
            <Grid container item xs={12} direction='column' justify='center' alignItems='center'>
                    <label style={{fontSize: '2rem',
                                    color: '#000000',
                                    fontWeight: "800",
                                    textAlign: 'center',
                                    marginBottom: '1rem'}}
                            to={name}>
                        <Grid item xs={12} >
                        {label}
                        </Grid>
                    </label>
                <Grid item xs={12}>
                    <ButtonGroup type='button' size="large" color="primary" aria-label="large default button group">
                        
                        <Button {...input} variant={yes ? 'contained' : 'outlined'} onClick={() => toggleButtons(1) }>Yes</Button>
                        
                        <Button {...input} variant={no ? 'contained' : 'outlined'} onClick={() => toggleButtons(2) }>No</Button>
                    
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12}>                
                    <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>
                </Grid>
        </Grid>
    );
}