import React from 'react';

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

    return (
        <Grid container item xs={12} justify='center' alignItems='center'>
            <div className="stool-form-question">
                <Grid item xs={12} >
                    <label style={{fontSize: '2rem',
                                    color: '#000000',
                                    fontWeight: "800"}}
                            to={name}>
                        {label}
                    </label>
                </Grid>
                <Grid container item xs={12} justify='center' alignItems='center'>
                    <ButtonGroup size="large" color="primary" aria-label="large contained default button group">
                        
                        <Button>Yes</Button>
                        
                        <Button>No</Button>
                    
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12}>                
                    <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>
                </Grid>
            </div>
        </Grid>
    );
}