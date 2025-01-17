import React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from '@material-ui/core/styles';


const selector = formValueSelector('Full_Log_Form');

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

function Full_Comp_2 ({input, name, urgency, label, className, options, default_val, meta: { error, touched }}) {
    const classes = useStyles();

    // const [value, setValue] = React.useState(input.checked);

    // console.log(urgency)
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
                    <RadioGroup aria-label="urgency" {...input}>
                    <Grid className={classes.radios} container item xs={12} direction='row' justify='center' alignItems='center'>
                        {
                            options.map(({value, r_label}, index) => {
                                return (
                                    <FormControlLabel key={index} value={value} control={<Radio checked={value === urgency ? true : false}/>} label={r_label} labelPlacement='bottom' />
                                )
                            })
                        }
                    </Grid>
                    </RadioGroup>
                </FormControl>
        </Grid>
    );
}



Full_Comp_2 = connect(
    (state, props) => ({
      urgency: selector(state, 'urgency')
    })
  )(Full_Comp_2)

export default Full_Comp_2;