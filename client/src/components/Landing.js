import React from 'react';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import BottomNav from './BottomNav'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import PlusOneRoundedIcon from '@material-ui/icons/PlusOneRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

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
    landing_img: {
        [theme.breakpoints.down('sm')]: {
            maxHeight: '70vh',
            maxWidth: '90vw',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: `calc(60vw - ${drawerWidth}px)`,            
            maxHeight: '50vh',
        },
    },
    loading_msg: {
      textAlign: 'center',
      display: 'block',
    },
    landing_greeting: {
        textAlign: 'center',

    },
    btn_font: {
        fontSize: '2rem',
    }
  }));

function Landing(props) {
    const classes = useStyles();
    const theme = useTheme();

    const { auth, children, handleDrawerToggle } = props;

    const list = (
        // this auth object actually has our user data
            auth === null ? <span className={classes.loading_msg}> 'Loading'</span>:
            !auth ? [    
                <Grid className={theme.root_content} container spacing={0} direction="column" alignItems="center" justify="center">          
                    <Grid item xs={12} key='1'><img alt="Scroll depicting the use of Stool Story, a place to log your logs." className={classes.landing_img} src='./assets/landing-scroll.png'/></Grid>
                    <Grid item xs={12} key='2'><Typography variant='h3' style={{textAlign: 'center'}}>Log your logs</Typography></Grid>
                    <Grid item xs={12} key='3'><Hidden mdDown><a alt='Sign in with Google button' className='log-in-btn' href='/auth/google'><img src='/assets/sign-in-images/btn_google_signin_dark_normal_web@2x.png'/></a></Hidden></Grid>
                </Grid>  
             ] :
            [
                //satify the react key requirement    
                <Grid key={1} item xs={12}><h3 className={classes.landing_greeting}>Welcome back, {auth.firstName}</h3></Grid>,            
                <Grid key={2} item xs={12}>
                        <ButtonGroup
                            orientation='vertical'
                            color="primary"
                            variant="contained" 
                            size="large"
                            full-width='true'
                            aria-label="vertical outline primary button group"
                            >                               
                            {
                                children.map(({to, text, link}, index) => {
                                    if(!link) {return ''}

                                    return (                                                                    
                                        <Button 
                                            key={index} 
                                            component={link ? Link : 'a'} 
                                            to={to} href={to} 
                                            className={classes.btn_font}
                                            startIcon={
                                                    to.includes('full_log') ? <AddCircleRoundedIcon /> : 
                                                    to.includes('log_list') ? <FormatListNumberedRoundedIcon /> :
                                                    to.includes('insta_log') ? <PlusOneRoundedIcon /> : <DateRangeRoundedIcon />                                          
                                            }
                                            >                                       
                                            {text}                                             
                                        </Button> 
                                    )
                                })
                            }
                        </ButtonGroup>  
                </Grid>   
            ]
            

    )

    return (    
        <Grid  container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.root_content}
            >               
            
            {list}
                
            <Hidden smUp>
                    <BottomNav  toggleSide={handleDrawerToggle} children={children}/>
            </Hidden> 

        </Grid>
    )
    
}


export default Landing;