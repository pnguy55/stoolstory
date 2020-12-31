import React, { Component, useContext } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogs, deleteLog } from '../actions/index';
import { ReactSVG } from 'react-svg';
import BottomNav from './BottomNav';
import { BulletList } from 'react-content-loader';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import Paper from '@material-ui/core/Paper';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import { ButtonGroup, Button } from '@material-ui/core';
import { ReactComponent as Monday } from '../components/svg/days-of-week/monday.svg'
import { ReactComponent as Tuesday } from '../components/svg/days-of-week/tuesday.svg'
import { ReactComponent as Wednesday } from '../components/svg/days-of-week/wednesday.svg'
import { ReactComponent as Thursday } from '../components/svg/days-of-week/thursday.svg'
import { ReactComponent as Friday } from '../components/svg/days-of-week/friday.svg'
import { ReactComponent as Saturday } from '../components/svg/days-of-week/saturday.svg'
import { ReactComponent as Sunday } from '../components/svg/days-of-week/sunday.svg'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/styles';
import { map } from 'lodash';

import MenuDrawerContext from './contexts/menuDrawerContext';

const localizer = momentLocalizer(moment);

let drawerWidth = 240;

let date = new Date();
let year = date.getFullYear();
let currDay = date.getDay();


let monthMap = createMonthMap(year);
let dayMap = createWeekDayMap();

function createWeekDayMap(){

    let daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    let fullDaysOfWeek = ['sunday', 'monday','tuesday', 'wednesday','thursday','friday','saturday'];
    let daySVG = [
        <Sunday style={{height: '4rem', width: '4rem'}} />,
        <Monday style={{height: '4rem', width: '4rem'}} />,
        <Tuesday  style={{height: '4rem', width: '4rem'}} />,
        <Wednesday style={{height: '4rem', width: '4rem'}} />,
        <Thursday  style={{height: '4rem', width: '4rem'}} />,
        <Friday style={{height: '4rem', width: '4rem'}} />,
        <Saturday style={{height: '4rem', width: '4rem'}} />,
    ]

    let map = new Map();
    for(let i = 0; i < daysOfWeek.length; i++) {
        map.set(i, [daysOfWeek[i], fullDaysOfWeek[i], daySVG[i]]);
    }

    return map;
}

function createMonthMap(year) {
    let map = new Map();

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    for(let i = 1; i < 13; i++) {
        if((i === 2) && (year % 4 === 0) ) {
            map.set(i, [months[i], 29]);
        }
        else if( i === 2 ) {
            map.set(i, [months[i], 28]);
        }
        else if( ((i % 2) !== 0) || (i === 8) ){
            map.set(i, [months[i], 31]);
        }
        else {
            map.set(i, [months[i], 30]);
        }
    }

    return map;
}


const styles = theme => ({
    root_content: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '90vh',
            minWidth: '100vw',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: `calc(100vw - ${drawerWidth}px)`,                   
            minHeight: '90vh',
        },

        overflowX: 'hidden',
    },
    root: {
        flexGrow: 1,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    sit_on_top: {
      zIndex: "9000",
    },
    input_on_line: {

    },
    'slider_img': {
      width: '1.5rem',    
      height: 'auto',
    },
    log_card: {
        marginBottom: '1rem',       
        [theme.breakpoints.down('sm')]: {
            minWidth: '90vw',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: `calc(90vw - ${drawerWidth}px)`,          
        },
    },
    log_list_svg: {
        width: '4rem',
        height: '4rem',
    },
    avatar_svg: {
        backgroundColor: 'rgb(0,0,0,0)',
        color: '#000'
    },
    list_date: {
        marginLeft: '1rem',
    },
    valueLabelStool: {
        fontSize:'2rem',
    },
    valueLabelBlood: {
        fontSize:'1.5rem',
    },
    valueLabelPain: {
        fontSize: '1.5rem',
        textAlign: 'center',
        display: 'flex',
        justify: 'center'
    },
    valueLabel: {
        fontSize:'2rem',
        fontFamily: 'Raleway'
    },
    log_day: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflowX: 'scroll',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            width: '0',
            height: '0',
        }
    },
    primary_log: {
        borderRight: '2px solid #808080 ',
        padding: '0rem 1rem',
    },
    secondary_log: {
        borderRight: '2px solid #808080 ',
        padding: '0rem 1rem',
    },
    single_log: {
    },
    btn_font: {
        fontSize: '1.5rem',
    }
  });

class LogCal extends Component {
    // static menuDrawer = MenuDrawerContext

    constructor(props){
        super(props)
        this.state = {
            monthMap: monthMap,
            dayMap: dayMap,
            currDay: currDay,
            focusDate: new Date(),
            dense: false,
            secondary: false,
            logs: this.props.logs,
            number_of_days_listed: 45,
            children: this.props.children,
            events: [
                {
                  start: moment().toDate(),
                  end: moment()
                    .add(1, "days")
                    .toDate(),
                  title: "Some title"
                }
              ]

        }
        this.setDense = this.setDense.bind(this);
        this.setSecondary = this.setSecondary.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.ColoredDateCellWrapper =  this.ColoredDateCellWrapper.bind(this);
        // this.generate = this.generate.bind(this);
        // this.valueLabelBloodPain = this.valueLabelBloodPain.bind(this);
        // this.valueLabelPainLvl = this.valueLabelPainLvl.bind(this);
        // this.valueLabelBloodiness = this.valueLabelBloodiness.bind(this);
        // this.valueLabelStoolType = this.valueLabelStoolType.bind(this);

    }

    componentDidMount() {
        this.props.fetchLogs();
        console.log(this.props)

    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.logs !== this.props.logs) {
            this.setState({
                logs: this.props.logs
            }, () => {
                console.log(this.state)
            })
        }
        
    }

    

    setDense(){
        this.setState((prevState)=> {
            return ({
            dense: !prevState.dense,
            })
        });
    }
    setSecondary(){
        this.setState((prevState)=> {
            return ({
            secondary: !prevState.secondary,
            })
        });
    }

    handleDateChange(date) {
        this.setState({
            focusDate: date
        })
    }

    ColoredDateCellWrapper({ children }) {
        React.cloneElement(React.Children.only(children), {
            style: {
            backgroundColor: 'lightblue',
            },
        })
    }

    
    render() {

        return (
            this.props.logs.length < 1 ? <BulletList /> :
            <div>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        autoOk
                        orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={this.state.focusDate}
                        onChange={this.handleDateChange}
                        className={this.props.root_content}
                    />
                </MuiPickersUtilsProvider> */}
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    style={{ height: "100vh" }}
                />
                <Hidden smUp>
                    <MenuDrawerContext.Consumer>                        
                        {value => (<BottomNav toggleSide={ value.handleDrawerToggle } children={this.props.children}/>) }
                        {/* <BottomNav toggleSide={ handle } children={this.state.children}/> */}
                    </MenuDrawerContext.Consumer>
               </Hidden> 
            </div>
        )
    }

}

function mapStateToProps(state) {
    // we declared the state piece's name in auth reducer
    return { 
        logs: [...state.logs]
    }
}

export default withStyles(styles, { withTheme: true })
(connect(mapStateToProps, { fetchLogs, deleteLog })(LogCal));

// export function Component() {
//     let menuContext = useContext(MenuDrawerContext);
  
//     return <LogCal appContext={appContext}></LogCal>
//   };