import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import LogList from './LogList';
import LogCal from './LogCal';
import StoolFormWizard from './forms/stoolForm/StoolFormWizard';
import BottomNav from './BottomNav';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
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
import { Block } from '@material-ui/icons';


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
  }
}));

function ResponsiveDrawer(props) {
  const { window, children, auth } = props;
  
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
                  <a href={to} key={index}>
                   <ListItem button key={to} className= {classes.drawerBtn}>
                        
                        <ListItemIcon className='stool-btn-icon link '>
                          <img className={classes.ResponsiveDrawer_img} src={img} />
                        </ListItemIcon>                                         
                    </ListItem>
                  </a>
                )
              }
              if(!link) {
                return (
                  <a href={to} key={index}>
                   <ListItem button key={to} className= {classes.drawerBtn}>
                        
                        <ListItemIcon className='stool-btn-icon link '>
                          <MeetingRoomRoundedIcon />
                        </ListItemIcon>    
                        
                        <ListItemText className='dark-text' primary= {text} />                                     
                    </ListItem>
                  </a>
                )
              }
              
              return (
                  <Link to={to} key={index}>
                   <ListItem button className= {classes.drawerBtn}>
                        
                        <ListItemIcon className='stool-btn-icon link '>
                        {
                        to === '/add_log' ? <AddCircleRoundedIcon /> : 
                        to === '/log_list' ? <FormatListNumberedRoundedIcon /> : 
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
                <img src='/stool-squad.png' style={{height: '2rem', marginRight: '.5rem', width: 'auto'}}></img> 
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
                  <ThemeProvider theme={theme} ><Landing {...props} children={children} auth={auth} /></ThemeProvider>
                )}  />
          <Route 
                path='/add_log/:page' 
                render={(props) => (
                  <ThemeProvider theme={theme} >
                    <StoolFormWizard {...props} auth={auth} />
                  </ThemeProvider>
                )}  />
          {/* <Route exact path='/add_log' component={StoolFormWizard} /> */}
          {/* <Route exact path='/' component={mainUserView}/> */}
          <Route exact path='/log_list' component={LogList} />
          <Route exact path='/log_cal' component={LogCal} />
        {/* <Route path='/tagLists/new' component={TagListWizard} /> */}
      </main>
      <Hidden smUp>
          <BottomNav toggleSide={handleDrawerToggle} children={children}/>
      </Hidden> 
    </div>
  );
}


export default ResponsiveDrawer;