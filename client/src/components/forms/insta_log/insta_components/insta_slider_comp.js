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
    fontSize: '5rem',
    color: '#000000',
    fontWeight: "800"
  },
  label:{
    fontSize: '1.5rem'
  },
  form_typography: {
      marginBottom: '3rem',
      fontSize: '5rem',
  },
  'slider_img': {
    width: '2rem',    
    height: 'auto',
  },
  valueLabelPain: {
    color: '#000',
    width: '14rem',
    display: 'flex',
    fontSize: '1.5rem',
    left: '6rem',
    position: 'relative',
  },
  valueLabelStool: {
    color: '#000',
    width: '10rem',
    display: 'flex',
    fontSize: '1.5rem',
    left: '4rem',
    position: 'relative',
  },
  valueLabelBlood: {
    color: '#000',
    width: '10rem',
    display: 'flex',
    fontSize: '1.5rem',
    left: '4rem',
    position: 'relative',
    '&>span': {

    }
  }
});


let Insta_Slider = withStyles(theme => ({
    root: {
      color: "#CFB08D",
      height: 8
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#87654D",
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
    },
    mark: {
        color: '#CFB08D',
        width: 4,
        height: 8,
    },
    markActive: {
        backgroundColor: '#87654D'
    }
  }))(Slider);

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
            return (
                <div className={classes.valueLabelBlood}>
                    <img className={classes.slider_img} src='/assets/bloodiness/NoBlood.png'/>
                    <span>&nbsp;None</span>
                </div>)
        }
        else if(value === 2) {
            return (
                <div className={classes.valueLabelBlood}>
                    <img className={classes.slider_img} src='/assets/bloodiness/Bloody.png' />
                    <span>&nbsp;A Little</span>
                </div>)
        }
        else {
            return (
                <div className={classes.valueLabelBlood}>
                    <img className={classes.slider_img} src='/assets/bloodiness/SuperBloody.png' />
                    <span>&nbsp;Lots</span>
                </div>)
        }
    }
    function valueLabelStoolType(value){
        if(value === 1) {
            return <span className={classes.valueLabelStool} >&#128166; Wet</span>
        }
        else if(value === 3) {
            return <span className={classes.valueLabelStool} >&#127761; Dry</span>
        }
        else {
            return <span className={classes.valueLabelStool} >&#128169; Normal</span>
        }
    }
    function valueLabelPainLvl(value){
        if(value === 1) {
            return <span className={classes.valueLabelPain} >&#128557; Painful</span>
        }
        else if(value === 2) {
            return <span className={classes.valueLabelPain} >&#128577; A little</span>

        }
        else {
            return <span className={classes.valueLabelPain} >&#128522; No</span>
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