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
  },
  form_typography: {
      marginBottom: '3rem',
  },
  'slider_img': {
    maxWidth: '100%',
    maxHeight: 'auto',
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
    },
    valueLabel: {
        width: 10,
        height: 10,
    }
  })(Slider);

  let Insta_label = withStyles({
    gutterBottom: {
        marginBottom: '3rem'
    }
  })(Typography)

export default ({input, name, label, meta: { error, touched }}) => {
    const classes = useStyles();
    const insta_slider = Insta_Slider;
    console.log(insta_slider)

    function handleChange(val) {
        input.value = val;

        let curr_val = input.value;
    }
    function valueLabelBloodiness(value){
        
        if(value === 1) {
            return (<img className={classes.slider_img} src='/assets/bloodiness/NoBlood.png' />)
        }
        else if(value === 2) {
            return (<img className={classes.slider_img} src='/assets/bloodiness/Bloody.png' />)
        }
        else {
            return (<img className={classes.slider_img} src='/assets/bloodiness/SuperBloody.png' />)
        }
    }
    function valueLabelStoolType(value){
        if(value === 1) {
            return (<img className={classes.slider_img} src='/assets/poop-types/Wet.png' />)
        }
        else if(value === 3) {
            return (<img className={classes.slider_img} src='/assets/poop-types/Dry.png' />)
        }
        else {
            return (<img className={classes.slider_img} src='/assets/poop-types/Normal.png' />)
        }
    }
    function valueLabelPainLvl(value){
        if(value === 1) {
            return (<img className={classes.slider_img} src='/assets/pain-lvls/Sad.png' />)
        }
        else if(value === 2) {
            return (<img className={classes.slider_img} src='/assets/pain-lvls/Uncomfort.png' />)
        }
        else {
            return (<img className={classes.slider_img} src='/assets/pain-lvls/Happy.png' />)
        }
    }

    return (
        <div className={classes.form_question}>
            <Insta_label id="discrete-slider" gutterBottom className="classes.form_typography">
                {label}
            </Insta_label>
            <Insta_Slider
                
                defaultValue={input.value}
                onChangeCommitted={(e, val) => handleChange(val)}                
                // getAriaValueText=
                valueLabelFormat={(e) => {
                    if(label === 'Bloody?') {
                        return valueLabelBloodiness(e)
                    }
                    else if(label === 'Did it hurt?'){
                        return valueLabelPainLvl(e)
                    }
                    else {
                        return valueLabelStoolType(e)
                    }
                }}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={1}
                marks
                min={1}
                max={3}
            />

            <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>

        </div>
    );
}