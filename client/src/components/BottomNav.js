import React from 'react';

import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import PlusOneRoundedIcon from '@material-ui/icons/PlusOneRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '4rem',
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  loading_msg: {
    textAlign: 'center',
    display: 'block',
  }
});

function SimpleBottomNavigation({children, toggleSide}) {
  const classes = useStyles();
//   const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
    //   value={value}
    //   onChange={(event, newValue) => {
    //     setValue(newValue);
    //   }}
    className={`${classes.stickToBottom} ${classes.root} ${classes.sit_on_top}`}
    
    showLabels = {children.length > 1 ? true : false}
    >
        <BottomNavigationAction
            label={'Menu'}
            className={classes.center_link}
            onClick={toggleSide}
            key={4}
            icon={<MenuRoundedIcon/>} />
        {
            typeof children !== 'object' ? 'Loading' : children.map(({to, text, link, img, bottom}, index) => {

            if(!bottom) return '';

            return (
                <BottomNavigationAction label={text} 
                        component={link ? Link : 'a'}
                        className={classes.center_link}
                        to={link ? to : ''}
                        href={link ? '' : to}
                        key = {index}
                        icon={
                                to.includes('full_log') ? <AddCircleRoundedIcon /> : 
                                to.includes('log_list') ? <FormatListNumberedRoundedIcon /> :
                                to.includes('insta_log') ? <PlusOneRoundedIcon /> : <img className={classes.bottom_nav_img} src={img} />
                        } > 
                                            
                </BottomNavigationAction>
            )}
        )
        }
        
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;