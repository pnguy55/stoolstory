import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
    width: '100%',
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


let Insta_Slider = withStyles({
    root: {
      color: "#8ED4B3",
      height: 8
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "4px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus,&:hover,&$active": {
        boxShadow: "inherit"
      }
    },
    active: {},
    track: {
      height: 8,
      borderRadius: 0
    },
    rail: {
      height: 8,
      borderRadius: 0,
      opacity: 1
    }
  })(Slider);

export default ({input, name, label, meta: { error, touched }}) => {
    const classes = useStyles();
    const insta_slider = Insta_Slider;
    console.log(insta_slider)

    function handleChange(val) {
        input.value = val;

        let curr_val = input.value;
    }

    return (
        <div className={classes.form_question}>
            <Typography id="discrete-slider" gutterBottom>
                {label}
            </Typography>
            <Insta_Slider
                
                defaultValue={input.value}
                onChangeCommitted={(e, val) => handleChange(val)}                
                // getAriaValueText=
                aria-valuetext={`${input.value}`}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={100}
            />

            <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>

        </div>
    );
}