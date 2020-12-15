import React from 'react';

import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
      className={`${classes.stickToBottom} ${classes.root}`}
      
      showLabels
    >
        {
            typeof children !== 'object' ? 'Loading' : children.reverse().map(({to, text}, index) => {

            if(to === '/api/logout') return '';    
            return (
                    <BottomNavigationAction label={text} 
                            component={Link}
                            to={to} 
                            key = {index}
                            icon={
                                    to === '/add_log' ? <AddCircleRoundedIcon /> : 
                                    to === '/log_list' ? <FormatListNumberedRoundedIcon /> :
                                    to === '/log_cal' ? <DateRangeRoundedIcon /> : 
                                    <MeetingRoomRoundedIcon />
                            } />

            )}
          )
        }
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;