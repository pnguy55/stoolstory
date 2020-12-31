import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

import Landing from './Landing';
import LogList from './LogList';
import LogCal from './LogCal';
import Full_Form from './forms/full_log/full_forms/Full_Form_Wizard';
import Insta_Form from './forms/insta_log/insta_forms/Insta_Form';
import BottomNav from './BottomNav';

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

import MenuDrawerContext from '../components/contexts/menuDrawerContext';

import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';

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
  const { window, children, auth, submit } = props;
  
  const classes = useStyles();
  const theme = useTheme();



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);


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
                    <Insta_Form {...props} auth={auth} onSubmit={values => submit(values)} />
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
                  <ThemeProvider theme={theme} >
                    <MenuDrawerContext.Provider value={{ mobileOpen, handleDrawerToggle }} >
                      <LogCal {...props} toggleSide={handleDrawerToggle} children={children} auth={auth} />
                    </MenuDrawerContext.Provider>
                  </ThemeProvider>
                )}  /> 
          {/* <Route exact path='/log_cal' component={LogCal} /> */}
        {/* <Route path='/tagLists/new' component={TagListWizard} /> */}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;