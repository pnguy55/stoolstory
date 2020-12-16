import React, { Component } from 'react';
import { Route, HashRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import LogList from './LogList';
import LogCal from './LogCal';
import StoolFormWizard from './forms/stoolForm/StoolFormWizard';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
    typography: {
     "fontFamily": `"Fredoka One", "Montserrat", "cursive", sans-serif`,
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500,
      h1: {
        fontFamily: "Fredoka One"
      },
      h2: {
        fontFamily: "Fredoka One"
      },
      h3: {
        fontFamily: "Fredoka One"
      },
      h4: {
        fontFamily: "Fredoka One"
      },
      button: {
        fontFamily: "Comic Sans MS"
      },
      span: {
        fontFamily: "Montserrat"
      } 
    }
 });

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();

    };
    render() {
        return (
            
            <HashRouter basename='/'>
                
                <ThemeProvider theme={THEME}>
                    {/* the exact makes sure that it only shows up on that path */}
                    <Header>
                    </Header>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/add_log' component={StoolFormWizard} />
                    {/* <Route exact path='/' component={mainUserView}/> */}
                    <Route exact path='/log_list' component={LogList} />
                    <Route exact path='/log_cal' component={LogCal} />
                    {/* <Route path='/tagLists/new' component={TagListWizard} /> */}
                </ThemeProvider>

            </HashRouter>
        );
    }
};

export default connect(null, actions)(App);







import React from 'react';

import { Link } from 'react-router-dom';
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    padding: theme.spacing(3),
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
  const { window, children } = props;
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
                 {/* {to: '/add_stool', text: 'Just Went!', link: true},
                    {to: '/log_list', text: 'Log List', link: true},
                    {to: '/log_cal', text: 'Calendar', link: true},
                    {to: '/api/logout', text: 'Logout', link: false},   */}
        
            {
             typeof children !== 'object' ? <span className={classes.loading_msg}>{children}</span> : children.map(({to, text, link, img}, index) => {
              
              if(to === '/auth/google') {
                return (
                  <a href={to} key={to + index}>
                   <ListItem button key={to} className= {classes.drawerBtn}>
                        
                        <ListItemIcon className='stool-btn-icon link '>
                          <img className={classes.ResponsiveDrawer_img} src={img} />
                        </ListItemIcon>                                         
                    </ListItem>
                  </a>
                )
              }
              
              return (
                  <Link to={to} key={to + index}>
                   <ListItem button className= {classes.drawerBtn}>
                        
                        <ListItemIcon className='stool-btn-icon link '>
                        {
                        to === '/add_log' ? <AddCircleRoundedIcon /> : 
                        to === '/log_list' ? <FormatListNumberedRoundedIcon /> :
                        to === '/log_cal' ? <DateRangeRoundedIcon /> : 
                        <MeetingRoomRoundedIcon />
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
          <Hidden lgUp>
            <div className="stool-story-logo">
              <Link to='/'
              style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              >
                  <img src='/stool-squad.png' style={{height: '2rem', marginRight: '.5rem', width: 'auto'}}></img> 
                  <span>Stool Story</span>
              </Link>
            </div>
          </Hidden>
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
        
      </main>
    </div>
  );
}


export default ResponsiveDrawer;














