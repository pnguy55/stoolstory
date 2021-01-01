import React, { Component, useContext } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogs, deleteLog } from '../actions/index';
import { ReactSVG } from 'react-svg';
import BottomNav from './BottomNav';
import { BulletList } from 'react-content-loader'

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';

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


import image from './svg/days-of-week/stool-squad.png';

const Stool_Tile = withStyles({
    tile: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })(GridListTile);

let drawerWidth = 240;

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
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
            map.set(i, [months[i - 1], 29]);
        }
        else if( i === 2 ) {
            map.set(i, [months[i - 1], 28]);
        }
        
        else if(i <= 7){
            if( ((i % 2) !== 0) ){
                map.set(i, [months[i - 1], 31]);
            }
            else {
                map.set(i, [months[i - 1], 30]);
            }
        }
        else if(i > 7) {
            if( ((i % 2) === 0) ){
                map.set(i, [months[i - 1], 31]);
            }
            else {
                map.set(i, [months[i - 1], 30]);
            }
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

        [theme.breakpoints.down('sm')]: {
            fontSize:'.75rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize:'1.75rem',
        },
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
    },
    btn_cal_controls: {
        fontSize: '1rem',
        border: '5px solid #CFB08D',
    },
    li : {
        '&>stool_div>div': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
  });

class LogList extends Component {
    // static menuDrawer = MenuDrawerContext

    constructor(props){
        super(props)
        this.state = {
            monthMap: monthMap,
            dayMap: dayMap,
            currDay: currDay,
            currDate: new Date().getDate(),
            currMonth: new Date().getMonth(),
            currYear: new Date().getFullYear(),
            focusYear: year,
            focusMonth: month,
            dense: false,
            secondary: false,
            logs: this.props.logs,
            number_of_days_listed: 45,
            children: this.props.children,
            year_state: {}

        }
        this.setDense = this.setDense.bind(this);
        this.setSecondary = this.setSecondary.bind(this);
        this.generate_year = this.generate_year.bind(this);
        this.valueLabelBloodPain = this.valueLabelBloodPain.bind(this);
        this.valueLabelPainLvl = this.valueLabelPainLvl.bind(this);
        this.valueLabelBloodiness = this.valueLabelBloodiness.bind(this);
        this.valueLabelStoolType = this.valueLabelStoolType.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);

    }

    componentDidMount() {
        this.props.fetchLogs();
        console.log(this.props)
        

    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.logs !== this.props.logs) {
            this.setState({
                logs: this.props.logs,
                year_state: this.generate_year()
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
    handleDateSelect(value) {
        if(value > 1000) {
            this.setState((prevState) => {return {
                focusYear: value
                }}
            )
        }
        else {
            this.setState((prevState) => {return {
                focusMonth: value
                }}
            )
        }
    }
    handleChangeDate(changeType) {
        switch(changeType) {
            case 'next':
                if(this.state.focusMonth === 12) {
                    this.setState((prevState) => {return {
                        focusYear: prevState.focusYear + 1,
                        focusMonth: 1
                    }}, () => {
                        console.log(this.state.focusMonth)
                    })
                    
                }
                else {
                    this.setState((prevState) => {return {
                        focusMonth: prevState.focusMonth + 1
                    }}, () => {
                        console.log(this.state.focusMonth)
                    })
                }
                break;
            default:
                if(this.state.focusMonth === 1) {
                    this.setState((prevState) => {return {
                        focusYear: prevState.focusYear - 1,
                        focusMonth: 12
                    }})
                    
                }
                else {
                    this.setState((prevState) => {return {
                        focusMonth: prevState.focusMonth - 1
                    }})
                }
                break;
        }
    }


    generate_year() {
        
        let logs_of_year = {}

        if(this.state.logs.length > 0) {
        
            for(let y = -1; y < 2; y++) {
                logs_of_year[this.state.focusYear + y] = {};

                for(let i = 1; i < 13; i++) {
                    logs_of_year[this.state.focusYear + y][i] = {};

                    let month_start = new Date(this.state.focusYear + y,i - 1, 1).getDay();
                    let next_month_beginning = 1;
                    for(let j = 0; j < 43; j++) {
                                       
                        if(j < month_start) {
                            // console.log(`Year: ${this.state.focusYear + y} Month: ${i} Date: ${monthMap.get( (i - 1) < 1 ? 12 : i - 1)[1] - ( (month_start - 1) - j)}`)

                            logs_of_year[this.state.focusYear + y][i][`j-${i === 1 ? this.state.focusYear + y - 1 : this.state.focusYear + y}${i === 1 ? 12 : (i - 1) < 10 ? `0${i - 1}` : (i - 1)}${monthMap.get( (i - 1) < 1 ? 12 : i - 1)[1] - ( (month_start - 1) - j) < 10 ? `0${monthMap.get( (i - 1) < 1 ? 12 : i - 1)[1] - ( (month_start - 1) - j)}` : monthMap.get( (i - 1) < 1 ? 12 : i - 1)[1] - ( (month_start - 1) - j)}`] = {year: i === 1 ? this.state.focusYear + y - 1 : this.state.focusYear + y, date: monthMap.get( (i - 1) < 1 ? 12 : i - 1)[1] - ( (month_start - 1) - j), month: (i - 1) < 1 ? 12 : i - 1 , logs: []}
                        }
                        else if(j > month_start && j <= (monthMap.get(i)[1] + month_start) ) {
                            // console.log(`Year: ${this.state.focusYear + y} Month: ${i} Date: ${monthMap.get(i)[1] - ( monthMap.get(i)[1] - (j - month_start) )}`)

                            logs_of_year[this.state.focusYear + y][i][`j-${this.state.focusYear + y}${i < 10 ? `0${i}` : (i)}${monthMap.get(i)[1] - ( monthMap.get(i)[1] - (j - month_start) ) < 10 ? `0${monthMap.get(i)[1] - ( monthMap.get(i)[1] - (j - month_start) )}` : monthMap.get(i)[1] - ( monthMap.get(i)[1] - (j - month_start) )}`] = {year: this.state.focusYear + y, date: monthMap.get(i)[1] - ( monthMap.get(i)[1] - (j - month_start) ), month: i, logs: []}
                        }
                        else if( j > (monthMap.get(i)[1] + month_start) ) {
                            // console.log(`Year: ${this.state.focusYear + y} Month: ${i} Date: ${(43 - (43 - (j - monthMap.get(i)[1] - month_start)) )} : ${next_month_beginning}`)

                            logs_of_year[this.state.focusYear + y][i][`j-${i === 12 ? this.state.focusYear + y + 1 : this.state.focusYear + y}${i === 12 ? 1 : (i + 1) < 10 ? `0${i + 1}` : (i + 1)}${next_month_beginning < 10 ? `0${next_month_beginning}` : next_month_beginning}`] = {year: i === 12 ? this.state.focusYear + y + 1 : this.state.focusYear + y, date: next_month_beginning, month: (i + 1) > 12 ? 1 : i + 1, logs: []}
                        
                            next_month_beginning++;
                        }


                        // console.log(month_start)
                        // console.log(logs_of_year[this.state.focusYear][i][j])

                        // calendar_day = {}

                    }
 
                }   
            }

            console.log(logs_of_year)
            for(let log of this.state.logs) {
                let log_date = log.log_date;
                let log_year = parseInt(log.log_date.substring(0,4), 10);
                let log_month = parseInt(log.log_date.substring(4,6), 10);
                // let log_date = log.log_date.substring(6,8);
                // console.log(logs_of_year[log_year]['12'])
                // set logs to an array for each month by date
                if( logs_of_year[log_year][log_month][`j-${log_date}`] !== undefined){
                    logs_of_year[log_year][log_month][`j-${log_date}`]['logs'].push(log);
                }
            }
        }

        return logs_of_year;

    }

    valueLabelBloodPain(bloodiness, pain_lvl) {
        
        return(
            <Grid key={`bloodpain${Math.random() * 1000000}`} container item xs={12} alignItems='center' justify='center' className={this.props.classes.secondary_log}>
                <Grid container item xs={6}>
                    {this.valueLabelBloodiness(bloodiness)}
                </Grid>
                <Grid item xs={6} >
                    {this.valueLabelPainLvl(pain_lvl)}
                </Grid>
            </Grid>
        )
    }

    valueLabelBloodiness(value){

        if(value === 1) {
            return (
                <Grid container item xs={12} justify='center'>
                    {this.state.secondary ? <img className={this.props.classes.slider_img} src='/assets/bloodiness/NoBlood.png'/> : null }
                </Grid>
            )
        }
        else if(value === 2) {
            return (                
                <Grid container item xs={12} justify='center'>
                    {this.state.secondary ? <img className={this.props.classes.slider_img} src='/assets/bloodiness/Bloody.png'/> : null }
                </Grid>
            )
        }
        else {
            return (                
                <Grid container item xs={12} justify='center'>
                    {this.state.secondary ? <img className={this.props.classes.slider_img} src='/assets/bloodiness/SuperBloody.png'/> : null }
                </Grid>
            )
        }
    }
    valueLabelPainLvl(value){
        if(value === 1) {
            return <span className={this.props.classes.valueLabelPain}> { this.state.secondary ? String.fromCodePoint(0x1F62D): null } </span>
        }
        else if(value === 2) {
            return <span className={this.props.classes.valueLabelPain}> { this.state.secondary ? String.fromCodePoint(0x1F61E) : null }</span>

        }
        else {
            return <span className={this.props.classes.valueLabelPain}> { this.state.secondary ? String.fromCodePoint(0x1F60A) : null }</span>
        }
    }
    valueLabelStoolType(value){
        if(value === 1) {
            return (
                <span className={this.props.classes.valueLabelStool} >&#128166;</span>
            )
        }
        else if(value === 3) {
            return (
                <span className={this.props.classes.valueLabelStool} >&#127761;</span>
            )
        }
        else {
            return (
                <span className={this.props.classes.valueLabelStool} >&#128169;</span>
            )
        }
    }


    renderMonth(){
        return (


                <Grid container item xs={12} direction='column' className={this.props.classes.root_content}>
                    <Grid container direction='column' alignItems='center' justify='center'>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={this.state.secondary}
                                    onChange={(event) => this.setSecondary(event.target.checked)}
                                    />
                                }
                                label="Enable secondary text"
                                />
                            </Grid> */}
                            <Grid container item xs={12} style={{margin:'1rem 0rem'}}>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Button 
                                        key='1' 
                                        onClick={() => {this.handleChangeDate('prev')}}
                                        variant="outlined" 
                                        size="medium"
                                        // component={Link}
                                        // to='/log_list'
                                        className={this.props.classes.btn_cal_controls}

                                        // startIcon={}
                                        // color='primary'
                                        >                                       
                                        Prev                                         
                                    </Button> 
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl>
                                        <InputLabel id="cal-month">Month</InputLabel>
                                        <Select
                                        labelId="select-month-label"
                                        id="select-month"
                                        value={this.state.focusMonth}
                                        onChange={(event) => {this.handleDateSelect(event.target.value)}}
                                        >
                                        <MenuItem value={1}>Jan</MenuItem>
                                        <MenuItem value={2}>Feb</MenuItem>
                                        <MenuItem value={3}>Mar</MenuItem>
                                        <MenuItem value={4}>April</MenuItem>
                                        <MenuItem value={5}>May</MenuItem>
                                        <MenuItem value={6}>June</MenuItem>
                                        <MenuItem value={7}>July</MenuItem>
                                        <MenuItem value={8}>Aug</MenuItem>
                                        <MenuItem value={9}>Sept</MenuItem>
                                        <MenuItem value={10}>Oct</MenuItem>
                                        <MenuItem value={11}>Nov</MenuItem>
                                        <MenuItem value={12}>Dec</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl>
                                        <InputLabel id="cal-years">Year</InputLabel>
                                        <Select
                                        labelId="select-years-label"
                                        id="select-years"
                                        value={this.state.focusYear}
                                        onChange={(event) => { this.handleDateSelect(event.target.value)}}
                                        >
                                        <MenuItem value={2019}>2019</MenuItem>
                                        <MenuItem value={2020}>2020</MenuItem>
                                        <MenuItem value={2021}>2021</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button 
                                        key='2' 
                                        onClick={() => {this.handleChangeDate('next')}}
                                        variant="outlined" 
                                        size="medium"
                                        // component={Link}
                                        // to='/log_cal'
                                        className={this.props.classes.btn_cal_controls}
                                        // startIcon={}
                                        >                                       
                                        Next                                          
                                    </Button> 
                                </Grid>
                                <Grid item xs={1}></Grid>
                            </Grid>
                    </Grid>  

                    
                    <GridList cellHeight={'auto'} cols={7} style={{border: '1px solid #000', height: '66vh', backgroundColor: '#fff'}}>
                        {/* <GridListTile key="Subheader" cols={7} style={{ height: 'auto' }}>
                            <ListSubheader component="div" style={{color: '#000'}}>December</ListSubheader>
                        </GridListTile> */}
                        {
                            this.state.year_state[this.state.focusYear] === undefined ? [] : 
                                Object.keys(this.state.year_state[this.state.focusYear][this.state.focusMonth])
                                    .map((key, index) => {
                                        let log = this.state.year_state[this.state.focusYear][this.state.focusMonth][key];

                                        return (
                                            <GridListTile key={index} cols={1} style={{height:'11vh', width:'14.28%', border:'1px solid #000'}}>
                                                <div style={{width: '100%', height:'100%'}}>    
                                                    {/* <img src={image} alt={key} style={{backgroundColor: '#fff', width: '100%', height:'auto'}} /> */}
                                                    {
                                                        this.state.year_state[this.state.focusYear][this.state.focusMonth][key]['logs'].length < 1 ? [] :
                                                        (                                                            
                                                            <GridList cols={3} style={{backgroundColor: '#fff', width: '100%', height:'100%', display: 'flex', alignItems: 'flex-end'}} >
                                                            {
                                                                this.state.year_state[this.state.focusYear][this.state.focusMonth][key]['logs']
                                                                .map((log, index) => {

                                                                    return (
                                                                        <Stool_Tile cols={1} key={index}  style={{maxHeight: '40%', display: 'flex', textAlign: 'center'}}>

                                                                        {/* <GridListTile cols={1} key={index} style={{backgroundColor: '#fff', maxHeight:'25%', background:`url(${image}) no-repeat center`, backgroundSize: 'auto 60%' }}> */}
                                                                            {this.valueLabelStoolType(log.stool_type)}
                                                                        </Stool_Tile>
                                                                    )
                                                                })
                                                            }
                                                            </GridList>
                                                        )
                                                    }
                                                </div>
                                                <GridListTileBar
                                                    style={{height: '20%'}}
                                                    titlePosition='top'
                                                    // title={tile.title}
                                                    title={log.date}
                                                    // subtitle={<span>by: {tile.author}</span>}
                                                    // actionIcon={
                                                    //     // <Typography variant='button'>{index}</Typography>
                                                    // }
                                                />
                                            </GridListTile>
                                        )
                                    })
                        }
                    </GridList>        


                </Grid>
        )
    }


    
    render() {

        return (
            this.props.logs.length < 1 ? <BulletList /> :
            <div className={this.props.root_content}>
                <Grid container direction='column' justify='center' align='center'>
                <Grid container item xs={12} justify='center'>
                        <ButtonGroup
                            color="default"
                            variant="contained" 
                            size="large"
                            full-width='true'
                            aria-label="vertical outline primary button group"
                            style={{marginTop: '1rem'}}
                            >
                            <Button 
                                key='1' 
                                component={Link}
                                to='/log_list'
                                className={this.props.classes.btn_font}
                                // startIcon={}
                                >                                       
                                Weekly                                         
                            </Button> 
                            <Button 
                                key='2' 
                                component={Link}
                                to='/log_cal'
                                className={this.props.classes.btn_font}
                                // startIcon={}
                                color='primary'
                                >                                       
                                Monthly                                          
                            </Button> 

                        </ButtonGroup>

                    </Grid>
                    <Grid container item xs={12} 
                            direction='row' 
                            justify='flex-start' 
                            align='center' 
                            style={{marginBottom: '3rem'}}>
                        {this.renderMonth()}
                    </Grid>
                </Grid>
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
(connect(mapStateToProps, { fetchLogs, deleteLog })(LogList));

// export function Component() {
//     let menuContext = useContext(MenuDrawerContext);
  
//     return <LogList appContext={appContext}></LogList>
//   };