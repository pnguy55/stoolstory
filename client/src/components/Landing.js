import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 100
    },
    loading_msg: {
      textAlign: 'center',
      display: 'block',
    }
  }));

function Landing(props) {
    const classes = useStyles();

    const { auth } = props;
    {console.log(auth)}

    const list = (
        // this auth object actually has our user data
            auth === null ? <span className={classes.loading_msg}> 'Loading'</span>:
            !auth ? [                
                    <Grid item xs={12} key='1'><img style={{height: '100%',width:'100%'}}src='./assets/landing-scroll.png'/></Grid>,
                    <Grid item xs={12} key='2'><h2 style={{textAlign: 'center'}}>Log your logs</h2></Grid>,
                    <Grid item xs={12} key='3'><Hidden mdDown><a className='log-in-btn' href='/auth/google'><img src='/assets/sign-in-images/btn_google_signin_dark_normal_web@2x.png'/></a></Hidden></Grid>

             ] :
            (
                //satify the react key requirement                
                <Grid item xs={12}>
                        <ButtonGroup
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical outlined primary button group"
                        >                            
                            <Grid item xs={12}><Button component={Link} to='/add_log' > Add Log </Button></Grid>
                            <Grid item xs={12}><Button component={Link} to='/log_list'> Log List </Button></Grid>
                            <Grid item xs={12}><Button component={Link} to='/log_cal'> Calendar </Button></Grid>
                            
                        </ButtonGroup>  
                </Grid>   
            )
            

    )

    return (    
        <Grid  container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '90vh' }}>               
                {list}
        </Grid>
    )
    
}


export default Landing;