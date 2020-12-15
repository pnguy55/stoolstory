import React from 'react';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
      <div className={classes.toolbar} />
        <Divider />
        <List>
                 {/* {to: '/add_stool', text: 'Just Went!', link: true},
                    {to: '/log_list', text: 'Log List', link: true},
                    {to: '/log_cal', text: 'Calendar', link: true},
                    {to: '/api/logout', text: 'Logout', link: false},   */}
        
            {
             typeof children !== 'object' ? 'Loading' : children.map(item => (
                <Link to={item.to}>
                    <ListItem button key={item.to} className= {classes.drawerBtn}>
                        
                        <ListItemIcon className='stool-btn-icon link '>
                        {
                        item.to === '/add_log' ? <AddCircleRoundedIcon /> : 
                        item.to === '/log_list' ? <FormatListNumberedRoundedIcon /> :
                        item.to === '/log_cal' ? <DateRangeRoundedIcon /> : 
                        <MeetingRoomRoundedIcon />
                        }
                        </ListItemIcon>                    
                        <ListItemText className='dark-text' primary= {item.text} />
                        
                    </ListItem>
                </Link>
              ))
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
            color="#000"
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
      
    </div>
  );
}


export default ResponsiveDrawer;














