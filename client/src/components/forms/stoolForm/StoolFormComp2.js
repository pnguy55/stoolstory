import React, { useEffect, useState } from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Helpers from '../../helpers/helpers';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from '@material-ui/core/styles';
import theme from '../../style/theme';
import { rest } from 'lodash';


const selector = formValueSelector('stoolForm');

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

function StoolFormComp2 ({input, name, urgency, label, className, options, default_val, meta: { error, touched }}) {
    const classes = useStyles();

    // const [value, setValue] = React.useState(input.checked);

    console.log(urgency)
    // const handleChange = (event) => {
    //   input.check = event.target.value;
    // };

    // useEffect(() => {
    //     input.checked = value
    //     console.log(input)
    // }, [input.checked]);

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
                    <RadioGroup aria-label="urgency" {...input} defaultValue={urgency ? urgency : '1'}>
                    <Grid className={classes.radios} container item xs={12} direction='row' justify='center' alignItems='center'>
                        {
                            options.map(({value, r_label}, index) => {
                                return (
                                    <FormControlLabel key={index} value={value} control={<Radio />} label={r_label} labelPlacement='bottom' />
                                )
                            })
                        }
                    </Grid>
                    </RadioGroup>
                </FormControl>
        </Grid>
    );
}



StoolFormComp2 = connect(
    (state, props) => ({
      urgency: selector(state, 'urgency')
    })
  )(StoolFormComp2)

export default StoolFormComp2;