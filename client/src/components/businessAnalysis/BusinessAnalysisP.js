import React, { useContext, useEffect, useState } from 'react';
import {connect } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import BottomNav from '../BottomNav'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import MenuDrawerContext from '../contexts/menuDrawerContext';

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

function BusinessAnalysisP(props) {
    const classes = useStyles();
    const theme = useTheme();

    const menuDrawer = useContext(MenuDrawerContext);
    const { children, toggleSide, logs, auth } = props;

    // let [auth, setAuth] = useState(props.auth);

    let [list, setList] = useState();
    let [stool_type, set_stool_type] = useState(new Map([[1, 0],[2, 0],[3, 0]]));
    let [pain_lvl, set_pain_lvl] = useState(new Map([[1, 0],[2, 0],[3, 0]]));
    let [spottiness, set_spottiness] = useState(new Map([[1, 0],[2, 0],[3, 0]]));
    
    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState(undefined);

    // console.log(props);

    function logAnalysis(logs){
        if(logs.length > 0)  {
            // console.log('hi', logs)
            for(let log of logs) {
                set_stool_type(stool_type.set(log.stool_type, stool_type.get(log.stool_type) + 1));
                set_pain_lvl(pain_lvl.set(log.pain_lvl, pain_lvl.get(log.pain_lvl) + 1));
                set_spottiness(spottiness.set(log.bloodiness, spottiness.get(log.bloodiness) + 1));
                
            }
            // console.log(stool_type)
            // console.log(pain_lvl)
            // console.log(spottiness)
        }
    }

    useEffect((prevProps) => {
        
            logAnalysis(logs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // disables this warning
        //React Hook useEffect has missing dependencies: 'fetchLogs' and 'logs'. Either include them or remove the dependency array react-hooks/exhaustive-deps
            setListHandler()
    },[auth, pain_lvl, stool_type, spottiness, logs])

    function setListHandler() {
        
        setList(
            // this auth object actually has our user data
            auth === null ? <span className={classes.loading_msg}> 'Please log in an submit a log'</span>:
            !auth ? [    
                <Grid className={theme.root_content} container spacing={0} direction="column" alignItems="center" justify="center">          
                    <Grid item xs={12} key='1'><img alt="Scroll depicting the use of Stool Story, a place to log your logs." className={classes.landing_img} src='./assets/landing-scroll.png'/></Grid>
                    <Grid item xs={12} key='2'><Typography variant='h3' style={{textAlign: 'center'}}>Log your logs</Typography></Grid>
                    <Grid item xs={12} key='3'><Hidden mdDown><a alt='Sign in with Google button' className='log-in-btn' href='/auth/google'><img src='/assets/sign-in-images/btn_google_signin_dark_normal_web@2x.png'/></a></Hidden></Grid>
                </Grid>  
             ] :
            [
                //if logged in 
                <Grid key={1} container item xs={12}>
                    
                    <Grid container item xs={12} direction='column' alignItems='center'>
                        <Grid item><Typography variant='h4' style={{height:'fit-content'}}>Log Types</Typography></Grid>
                        <Grid item>
                            <PieChart
                                data={[
                                    { title: 'Wet', value: stool_type.get(1), color: '#E38627' },
                                    { title: 'Norm', value: stool_type.get(2), color: '#C13C37' },
                                    { title: 'Dry', value: stool_type.get(3), color: '#6A2135' },
                                ]}
                                animate
                                animationDuration={500}
                                animationEasing="ease-out"
                                center={[50, 50]}
                                
                                label={( {dataEntry} ) => Math.round(dataEntry.percentage) > 0 ? `${dataEntry.title} ${Math.round(dataEntry.percentage) + '%'}` : ''   }
                                labelPosition={100 - 70 / 2}
                                labelStyle={{
                                fill: '#fff',
                                opacity: 0.75,
                                pointerEvents: 'none',
                                fontSize: '.5rem'
                                }}
                                />
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} direction='column' alignItems='center'>
                        <Grid item><Typography variant='h4'>Pain Lvls</Typography></Grid>
                        <Grid item>
                            <PieChart
                            
                                    data={[
                                        { title: 'None', value: pain_lvl.get(3), color: '#E38627' },
                                        { title: 'Slight', value: pain_lvl.get(2), color: '#C13C37' },
                                        { title: 'Painful', value: pain_lvl.get(1), color: '#6A2135' },
                                    ]}
                                    radius={PieChart.defaultProps.radius - 6}
                                    lineWidth={60}
                                    animate
                                    label={( {dataEntry} ) => Math.round(dataEntry.percentage) > 0 ?  dataEntry.title : '' }
                                    labelPosition={100 - 60 / 2}
                                    labelStyle={{
                                    fill: '#fff',
                                    opacity: 0.75,
                                    pointerEvents: 'none',
                                    fontSize: '.5rem'
                                    }}
                                    />
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} direction='column' alignItems='center'>
                        <Grid item><Typography variant='h4'>Spottiness?</Typography></Grid>
                        <Grid item>
                            <PieChart
                                    data={[
                                        { title: 'No', value: spottiness.get(1), color: '#E38627' },
                                        { title: 'Little', value: spottiness.get(2), color: '#C13C37' },
                                        { title: 'Very', value: spottiness.get(3), color: '#6A2135' },
                                    ]}
                                    radius={PieChart.defaultProps.radius - 6}
                                    lineWidth={60}
                                    animate
                                    label={( {dataEntry} ) => Math.round(dataEntry.percentage) > 0 ?  dataEntry.title : '' }
                                    labelPosition={100 - 60 / 2}
                                    labelStyle={{
                                    fill: '#fff',
                                    opacity: 0.75,
                                    pointerEvents: 'none',
                                    fontSize: '.5rem'
                                    }}
                                    />
                        </Grid>
                    </Grid>
                </Grid>,
                <Grid key={2} item xs={12}><Typography variant='h4' className={classes.landing_greeting}>{auth.firstName}, your story is growing!</Typography></Grid>,            
                // <Grid key={3} item xs={12}>
                //         <ButtonGroup
                //             orientation='vertical'
                //             color="primary"
                //             variant="contained" 
                //             size="large"
                //             full-width='true'
                //             aria-label="vertical outline primary button group"
                //             >                               
                //             {
                //                 children.map(({to, text, link}, index) => {
                //                     if(!link) {return ''}

                //                     return (                                                                    
                //                         <Button 
                //                             key={index} 
                //                             component={link ? Link : 'a'} 
                //                             to={to} href={to} 
                //                             className={classes.btn_font}
                //                             startIcon={
                //                                     to.includes('full_log') ? <AddCircleRoundedIcon /> : 
                //                                     to.includes('log_list') ? <FormatListNumberedRoundedIcon /> :
                //                                     to.includes('insta_log') ? <PlusOneRoundedIcon /> : <DateRangeRoundedIcon />                                          
                //                             }
                //                             >                                       
                //                             {text}                                             
                //                         </Button> 
                //                     )
                //                 })
                //             }
                //         </ButtonGroup>  
                // </Grid>   
            ]
            

    )
    }
    

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
                    <BottomNav toggleSide={menuDrawer.handleDrawerToggle} children={children}/>
            </Hidden> 

        </Grid>
    )
    
}

function mapStateToProps(state) {
    // we declared the state piece's name in auth reducer
    return { 
        logs: [...state.logs]
    }
}

export default connect(mapStateToProps)(BusinessAnalysisP);