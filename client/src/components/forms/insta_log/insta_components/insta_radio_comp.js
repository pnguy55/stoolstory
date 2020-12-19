import React, { useEffect } from 'react';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  big_field: {
    '&>div>input' : {     
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',       
        height: '7rem',
    }
  },
  form_question: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  },
  form_label: {
    fontSize: '2rem',
    color: '#000000',
    fontWeight: "800",
    '&focused': {
        color: '#000000'
    }
  },
  radios: {
      '&>*':{

        margin: '0px'
      }
  }
});

function Insta_radio_comp({input, name, label, className, options, meta: { error, touched }}) {
    const classes = useStyles();
    console.log(options)

    return (
            <Grid className={classes.form_question} container item xs={12} direction='column' justify='center' alignItems='center'>
                <FormControl component="fieldset">
                    <FormLabel 
                        component="label" 
                        style={{
                            fontSize: '2rem',
                            color: '#000000',
                            fontWeight: "800",
                            marginBottom: '2rem',
                            '&focused': {
                                color: '#000000'
                            }
                        }}>
                        {label}
                    </FormLabel>
                    <RadioGroup aria-label={name} {...input}>
                    <Grid className={classes.radios} container item xs={12} direction='row' justify='center' alignItems='center'>
                        {
                            _.forEach(options, ({value, r_label}, index) => {
                                return (
                                    <FormControlLabel key={index} value={value} control={<Radio checked={value}/>} label={r_label} labelPlacement='bottom' />
                                )
                            })
                        }
                    </Grid>
                    </RadioGroup>
                </FormControl>
        </Grid>
    );
}

export default Insta_radio_comp