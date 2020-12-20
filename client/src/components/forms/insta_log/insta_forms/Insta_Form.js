import React from 'react';
import renderFields from '../insta_renders/insta_render_fields';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import { makeStyles } from '@material-ui/core/styles';


const drawerWidth = 240;


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    hours = hours < 10 ? '0'+hours : hours;
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ':' + minutes;
    return strTime;
}

function formatMMDDYY(date) {
    // return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear());
    return (date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())));
}

const useStyles = makeStyles(theme => ({
    root_content: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '90vh',
            minWidth: '100vw',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: `calc(100vw - ${drawerWidth}px)`,            
            minHeight: '90vh',
        },
    },
    loading_msg: {
      textAlign: 'center',
      display: 'block',
    },
    landing_greeting: {
        textAlign: 'center',

    },
    card_content: {
        marginBottom: '2rem',
    }
  }));


const Insta_Form = props => {

    const classes = useStyles();
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <Grid className={classes.root_content} 
            container 
            justify='center' 
            alignItems='center'
            direction='column'
            >
            <form onSubmit={handleSubmit}>
                <Grid container item
                    xs={12}
                    direction='column'
                    justify='center'
                    alignItems='center'
                    >
                    
                    {renderFields()}

                </Grid>
                <Grid container item xs={12} justify="center" alignItems="center" className="margin-btm-sml">
                    <Grid item xs={1}/>
                    <Grid item xs={3} className='stool-btn flex-link'>

                        <Button component={Link} to='/'>
                            <KeyboardReturnIcon className="stool-btn-icon" fontSize="large"/>
                        </Button>

                        
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={3} className='stool-btn flex-link'>
                        <Button type="submit" disabled={pristine || submitting}>
                            <ArrowForwardRoundedIcon className="stool-btn-icon" fontSize="large"/>
                        </Button>
                    </Grid>
                    <Grid item xs={1}/>
                </Grid>
            </form>
        </Grid>
    )
}


export default reduxForm({
    form: 'Insta_Log_Form',
    initialValues: {
        date_time: `${formatMMDDYY(new Date)}T${formatAMPM(new Date)}`,
        pain_lvl: 1,
        stool_type: 2,
        bloodiness: 1,
    }
  })(Insta_Form)
  