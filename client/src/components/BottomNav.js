import React from 'react';

import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '7rem',
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left:0,
  },    
  sit_on_top: {
    zIndex: "9000",
  },
  bottom_nav_img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  center_link: { 
    '&>span' : {     
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }
  },
  loading_msg: {
    textAlign: 'center',
    display: 'block',
  }
});

function SimpleBottomNavigation({children}) {
  const classes = useStyles();
//   const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
    //   value={value}
    //   onChange={(event, newValue) => {
    //     setValue(newValue);
    //   }}
    className={`${classes.stickToBottom} ${classes.root} ${classes.sit_on_top}`}
    
    showLabel = {children.length > 1 ? true : false}
    >
        {
            typeof children !== 'object' ? <span className={classes.loading_msg}>{children}</span> : children.reverse().map(({to, text, link, img}, index) => {

            if(to === '/api/logout') return '';  
            

            
            return (
        
                <BottomNavigationAction label={text} 
                        component={link ? Link : 'a'}
                        className={to === '/auth/google' ? classes.center_link : ''}
                        to={link ? to : ''}
                        href={link ? '' : to}
                        key = {index}
                        icon={
                                to === '/add_log' ? <AddCircleRoundedIcon /> : 
                                to === '/log_list' ? <FormatListNumberedRoundedIcon /> :
                                to === '/log_cal' ? <DateRangeRoundedIcon /> : <img className={classes.bottom_nav_img} src={img} />
                        } > 
                                            
                </BottomNavigationAction>
            )}
        )
        }
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;