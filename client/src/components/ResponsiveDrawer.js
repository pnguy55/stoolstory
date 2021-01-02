import React, { useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import xlsx from 'json-as-xlsx';

import { fetchLogs, deleteLog } from '../actions/index';

import Landing from './Landing';
import LogList from './LogList';
import LogCal from './LogCal';
// import Full_Form from './forms/full_log/full_forms/Full_Form_Wizard';
import InstaForm from './forms/insta_log/insta_forms/Insta_Form';
// import BottomNav from './BottomNav';
import BusinessAnalysisR from './businessAnalysis/BusinessAnalysisR';
import BusinessAnalysisP from './businessAnalysis/BusinessAnalysisP';

import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import PlusOneRoundedIcon from '@material-ui/icons/PlusOneRounded';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import MenuDrawerContext from '../components/contexts/menuDrawerContext';

import { makeStyles, useTheme, ThemeProvider, MuiThemeProvider  } from '@material-ui/core/styles';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },    
  root_content: {
      [theme.breakpoints.down('sm')]: {
          minHeight: '90vh',
          minWidth: '100vw',
      },
      [theme.breakpoints.up('sm')]: {
          minWidth: `calc(100vw - ${drawerWidth}px)`,
      },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: '#fff',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    '&:focus': {
        background: "#fff",
     },
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  drawerBtn: {
    '&:hover': {
        background: "#CFB08D",
     },
  },
  content: {
    flexGrow: 1,   
  },
  drawer_img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  ResponsiveDrawer_img: {
    maxWidth: '200px',
    paddingRight: '16px',
  },
  loading_msg: {
    textAlign: 'center',
    display: 'block',
  },
  anchor_tag: {
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {      
      padding: '0px 16px',
    },
    [theme.breakpoints.up('sm')]: {        
      padding: '0px 31px',
    },
  },
  drawerIcon: {    
    display: 'flex',
    justifyContent: 'flex-start',
  },
  drawerText: {    
    display: 'flex',
    justifyContent: 'flex-start'
  }
}));

function ResponsiveDrawer(props) {
  const { window, children, auth, submit, logs, fetchLogs } = props;
  
  const classes = useStyles();
  const theme = useTheme();

  console.log(logs.length)
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

    // In a callback Hook to prevent unnecessary re-renders 
    const handleFetchItems = useCallback(() => {      
      fetchLogs();
      // fetchItemsFromApi().then(setItems);
    }, []);
  

  useEffect(() => {
      handleFetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // disables this warning
    //React Hook useEffect has missing dependencies: 'fetchLogs' and 'logs'. Either include them or remove the dependency array react-hooks/exhaustive-deps

  },[])

  
  // console.log('Drawer',props)

  function downloadXLSX(content) {

    let stool_map = new Map([
      [1, 'Wet'],
      [2, 'Normal'],
      [3, 'Dry'],
    ]);

    let pain_map = new Map([
      [1, 'Painful'],
      [2, 'Uncomfortable'],
      [3, 'Normal'],
    ])

    let blood_map = new Map([
      [1, 'No blood'],
      [2, 'A little blood'],
      [3, 'Quite Bloody'],
    ])


    var columns = [
      { label: 'Stool Type', value: row => ( stool_map.get(row.stool_type) )},
      { label: 'Bloodiness', value: row => ( blood_map.get(row.bloodiness) )},
      { label: 'Pain level', value: row => ( pain_map.get(row.pain_lvl) )},
      { label: 'Log Date', value: row => ( `${row.log_date.substring(4,6)}-${row.log_date.substring(6,8)}-${row.log_date.substring(0,4)}` )},
      { label: 'Log Time', value: row => ( `${row.log_time.substring(0,2)}:${row.log_time.substring(2,4)}` )},
      { label: 'Stool Average Frequency', 
                value: row => (row.business_analysis ? 
                            row.business_analysis.stool_average_freq || '' : '' ) },
      { label: 'Recommendations', 
                value: row => (row.business_analysis ? 
                            row.business_analysis.recommendations || '' : '' ) }, // Deep props
    ]
     
    var settings = {
      sheetName: `${Date().substring(0,15)}`, // The name of the sheet
      fileName: `${props.auth.firstName}'s Stool Story for ${Date().substring(0,15)}`, // The name of the spreadsheet
      extraLength: 3, // A bigger number means that columns should be wider
      writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
    }
     
    var download = true // If true will download the xlsx file, otherwise will return a buffer
     
    xlsx(columns, content, settings, download)
  }

  // function hasBottomNav(){
  //   switch()
  // }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className="stool-story-logo">
          <Link to='/'
          style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          >
              <span>Options</span>
          </Link>
        </div>
      </div>
        <Divider />
        <List>
            {
              <ListItem className={`${classes.anchor_tag} ${classes.drawerBtn}`} button={true} onClick={() => {downloadXLSX(props.logs)}} >
                  
                  <ListItemIcon className={`stool-btn-icon link ${classes.drawerIcon}`}>
                    <CloudDownloadIcon />
                  </ListItemIcon>    
                  
                  <ListItemText className={classes.drawerText} color='primary' primary= 'Download' />                                     
              </ListItem>}
            {
             typeof children !== 'object' ? <span className={classes.loading_msg}>{children}</span> : children.map(({to, text, link, img}, index) => {
              
              if(to === '/auth/google') {
                return (
                  <a className={classes.anchor_tag} href={to} key={index}>
                   <ListItem button key={to} className= {classes.drawerBtn}>
                        
                        <ListItemIcon className='stool-btn-icon link '>
                          <img className={classes.ResponsiveDrawer_img} 
                               alt='Google sign-in button.' 
                               src={img} />
                        </ListItemIcon>                                         
                    </ListItem>
                  </a>
                )
              }
              if(!link) {
                return (
                   <ListItem className={`${classes.anchor_tag} ${classes.drawerBtn}`} component={'a'} button key={to} href={to} >
                        
                        <ListItemIcon className={`stool-btn-icon link ${classes.drawerIcon}`}>
                          <MeetingRoomRoundedIcon />
                        </ListItemIcon>    
                        
                        <ListItemText className={classes.drawerText} color='primary' primary= {text} />                                     
                    </ListItem>
                )
              }
              
              return (
                  <Link to={to} key={index}>
                   <ListItem button className= {classes.drawerBtn}>
                        
                        <ListItemIcon className='stool-btn-icon link '>
                        {
                        to.includes('full_log') ? <AddCircleRoundedIcon /> : 
                        to.includes('log_list') ? <FormatListNumberedRoundedIcon /> : 
                        to.includes('insta_log') ? <PlusOneRoundedIcon /> :
                        <DateRangeRoundedIcon /> 

                        }
                        </ListItemIcon>                    
                        <ListItemText className='dark-text' primary= {text} />
                        
                    </ListItem>
                  </Link>
              )
            })
          }
          
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className="stool-story-logo">
            <Link to='/'
            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <img src='/stool-squad.png' 
                     style={{height: '2rem', marginRight: '.5rem', width: 'auto'}}
                     alt='Google sign-in button.'
                     >
                </img> 
                <span>Stool Story</span>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />  
        {/* the exact makes sure that it only shows up on that path */}      
            
        <Switch>
          <Route 
                exact path='/' 
                render={(props) => (
                  <ThemeProvider theme={theme} >
                    <MenuDrawerContext.Provider value={{ mobileOpen, handleDrawerToggle }} >
                      <Landing {...props} toggleSide={handleDrawerToggle} children={children} auth={auth} />
                    </MenuDrawerContext.Provider>
                  </ThemeProvider>
                )}  />
          {/* <Route 
                path='/full_log/:page' 
                render={(props) => (
                  <ThemeProvider theme={theme} >
                    <Full_Form {...props} auth={auth} />
                  </ThemeProvider>
                )}  /> */}
          <Route 
                exact path='/insta_log/' 
                render={(props) => (
                  <ThemeProvider theme={theme} >
                    <InstaForm {...props} auth={auth} onSubmit={values => submit(values)} />
                  </ThemeProvider>
                )}  />

          <Route 
                exact path='/log_list' 
                render={(props) => (
                  <ThemeProvider theme={theme} >
                    <MenuDrawerContext.Provider value={{ mobileOpen, handleDrawerToggle }} >
                      <LogList {...props} toggleSide={handleDrawerToggle} children={children} auth={auth} />
                    </MenuDrawerContext.Provider>
                  </ThemeProvider>
                )}  />  
          <Route 
                exact path='/log_cal' 
                render={(props) => (
                  <MuiThemeProvider  theme={theme} >
                    <MenuDrawerContext.Provider value={{ mobileOpen, handleDrawerToggle }} >
                      <LogCal {...props} toggleSide={handleDrawerToggle} children={children} logs={props.logs ? props.logs : []} auth={auth} />
                    </MenuDrawerContext.Provider>
                  </MuiThemeProvider >
                )}  /> 
          
          <Route 
                exact path='/business_analysis/r' 
                render={(props) => (
                  <MuiThemeProvider  theme={theme} >
                    <MenuDrawerContext.Provider value={{ mobileOpen, handleDrawerToggle }} >
                      <BusinessAnalysisR {...props} toggleSide={handleDrawerToggle} children={children} logs={props.logs ? props.logs : []} auth={auth} />
                    </MenuDrawerContext.Provider>
                  </MuiThemeProvider >
                )}  /> 
          <Route 
              exact path='/business_analysis/p' 
              render={(props) => (
                <MuiThemeProvider  theme={theme} >
                  <MenuDrawerContext.Provider value={{ mobileOpen, handleDrawerToggle }} >
                    <BusinessAnalysisP {...props} toggleSide={handleDrawerToggle} children={children} logs={props.logs ? props.logs : []} auth={auth} />
                  </MenuDrawerContext.Provider>
                </MuiThemeProvider >
              )}  /> 
        </Switch>
          {/* <Route exact path='/log_cal' component={LogCal} /> */}
        {/* <Route path='/tagLists/new' component={TagListWizard} /> */}
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  // we declared the state piece's name in auth reducer
  // console.log(state);
  return { 
    logs: [...state.logs]
  }
}

export default connect(mapStateToProps, { fetchLogs, deleteLog })(ResponsiveDrawer);