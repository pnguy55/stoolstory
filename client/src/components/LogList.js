import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogs, deleteLog } from '../actions/index';
import BottomNav from './BottomNav';
import { BulletList } from 'react-content-loader'

import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

import MenuDrawerContext from './contexts/menuDrawerContext';


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

class LogList extends Component {
    // static menuDrawer = MenuDrawerContext

    constructor(props){
        super(props)
        this.state = {
            monthMap: monthMap,
            dayMap: dayMap,
            currDay: currDay,
            dense: false,
            secondary: false,
            logs: this.props.logs,
            number_of_days_listed: 45,
            children: this.props.children,

        }
        this.setDense = this.setDense.bind(this);
        this.setSecondary = this.setSecondary.bind(this);
        this.generate = this.generate.bind(this);
        this.valueLabelBloodPain = this.valueLabelBloodPain.bind(this);
        this.valueLabelPainLvl = this.valueLabelPainLvl.bind(this);
        this.valueLabelBloodiness = this.valueLabelBloodiness.bind(this);
        this.valueLabelStoolType = this.valueLabelStoolType.bind(this);

    }

    componentDidMount() {
        this.props.fetchLogs();
        // console.log(this.props)

    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.logs !== this.props.logs) {
            this.setState({
                logs: this.props.logs
            }, () => {
                // console.log(this.state)
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

    generate = () => {


        let logs_list = _.cloneDeep(this.state.logs);
        let logs_count = logs_list.length > 100 ? 100 : logs_list.length;
        

        let log_map = new Map();


        // iterates through logs until there are none left
        for(let curr_log = logs_count - 1; curr_log >= 0; curr_log--) {
            // console.log('NEXT DAY')
            let log = logs_list[curr_log];
            let curr_log_time = parseInt(log.log_date, 10);
            // let curr_log_year = parseInt(log.log_date.substring(0, 4));
            // let curr_log_month = parseInt(log.log_date.substring(4, 6));
            // let curr_log_date = parseInt(log.log_date.substring(6, 8));

            if(log_map.has(curr_log_time))
                log_map.set(curr_log_time, [...log_map.get(curr_log_time), log]);
            else {
                log_map.set(curr_log_time, [log]);
            }
        }

        let day_in_milliseconds = 86400000;

        let listItems = []

        for(let i = 0; i < this.state.number_of_days_listed; i++) {
            
            // let curr_day_logs = []  
            // current date we are focused on
            let focus_date = new Date(new Date() - (day_in_milliseconds * i));
            // console.log((day_in_milliseconds * i))
            let focus_date_year = (focus_date.getFullYear()) * 10000;
            let focus_date_month = (focus_date.getMonth() + 1) * 100;
            let focus_date_num = focus_date.getDate();

            let focus_date_full = focus_date_year + focus_date_month + focus_date_num;
            // console.log(focus_date_full);
            let curr_day_of_week = focus_date.getDay();

            let curr_day_stool = []
            // let curr_day_blood_pain = []
            
            if(log_map.has(focus_date_full)) {
                curr_day_stool = 
                    log_map.get(focus_date_full)
                           .map(({stool_type, bloodiness, pain_lvl}, index) => {
                            return (
                                <Grid key={index} className={this.props.classes.single_log} container item xs={5} direction='column' alignItems='center'>
                                    {this.valueLabelStoolType(stool_type)}
                                    {this.valueLabelBloodPain(bloodiness, pain_lvl)}
                                </Grid>

                            )
                    });

                // curr_day_blood_pain =  
                //     log_map.get(focus_date_full)
                //         .map(({bloodiness, pain_lvl}) => {
                //             return this.valueLabelBloodPain(bloodiness, pain_lvl)
                //     });


            }
            
            listItems.push(
                <Grid container item xs={12} key={focus_date_full} style={{borderBottom: '2px solid #000', maxWidth: '100vw'}} wrap='wrap'>
                    <ListItem >
                        <Grid container item xs={3} direction='column' justify='center' alignItems='center'>
                                {this.state.dayMap.get(curr_day_of_week)[2]}                                
                                <Typography style={{marginLeft: '0px'}} variant='body1' align='center' className={this.props.classes.list_date}>{this.state.monthMap.get( (focus_date_month/100))[0]} - {focus_date_num}</Typography>                          
  
                        </Grid>
                        <Grid container item xs={9} className={this.props.classes.log_day}  alignItems='center' wrap='nowrap'>
                            {/* <Grid container item xs={12} alignItems='center' wrap="nowrap"  > */}
                                {curr_day_stool.length < 1 ? <Grid item xs={12}>NO LOG</Grid> : curr_day_stool}
                            {/* </Grid>
                            <Grid container item xs={12} alignItems='center' wrap="nowrap" >
                                {curr_day_blood_pain}
                            </Grid> */}
                        </Grid>
                        {/* <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction> */}
                    </ListItem>
                </Grid>
            )
            //push to main list items end
            



        }
            return listItems;
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
                    {this.state.secondary ? <img className={this.props.classes.slider_img} src='/assets/bloodiness/NoBlood.png' alt='toilet paper - no blood'/> : null }
                </Grid>
            )
        }
        else if(value === 2) {
            return (                
                <Grid container item xs={12} justify='center'>
                    {this.state.secondary ? <img className={this.props.classes.slider_img} src='/assets/bloodiness/Bloody.png' alt='toilet paper - a little blood'/> : null }
                </Grid>
            )
        }
        else {
            return (                
                <Grid container item xs={12} justify='center'>
                    {this.state.secondary ? <img className={this.props.classes.slider_img} src='/assets/bloodiness/SuperBloody.png' alt='toilet paper - quite bloody'/> : null }
                </Grid>
            )
        }
    }
    valueLabelPainLvl(value){
        if(value === 1) {
            return <span className={this.props.classes.valueLabelPain} role='img' aria-label='pain - painful'> { this.state.secondary ? String.fromCodePoint(0x1F62D): null } </span>
        }
        else if(value === 2) {
            return <span className={this.props.classes.valueLabelPain} role='img' aria-label='pain - uncomfortable'> { this.state.secondary ? String.fromCodePoint(0x1F61E) : null }</span>

        }
        else {
            return <span className={this.props.classes.valueLabelPain} role='img' aria-label='pain - no pain'> { this.state.secondary ? String.fromCodePoint(0x1F60A) : null }</span>
        }
    }
    valueLabelStoolType(value){
        if(value === 1) {
            return (
                <Grid key={`stoolType${Math.random() * 1000000}`} container item xs={12} direction='column' alignItems='center' justify='center' className={this.props.classes.primary_log}>
                    <Grid key={`stoolType${Math.random() * 1000000}`} item xs={12}><span className={this.props.classes.valueLabelStool} role='img' aria-label='stool - wet' >&#128166;</span></Grid>
                    <Grid key={`stoolType${Math.random() * 1000000}`} item xs={12} ><span className={this.props.classes.valueLabel}>Wet</span></Grid>
                </Grid>
            )
        }
        else if(value === 3) {
            return (
                <Grid key={`stoolType${Math.random() * 1000000}`} container item xs={12} direction='column' alignItems='center' justify='center' className={this.props.classes.primary_log}>
                    <Grid key={`stoolType${Math.random() * 1000000}`} item xs={12} ><span className={this.props.classes.valueLabelStool} role='img' aria-label='stool - dry' >&#127761;</span></Grid>
                    <Grid key={`stoolType${Math.random() * 1000000}`} item xs={12} ><span className={this.props.classes.valueLabel}>Dry</span></Grid>
                </Grid>
            )
        }
        else {
            return (
                <Grid key={`stoolType${Math.random() * 1000000}`} container item xs={12} direction='column' alignItems='center' justify='center' className={this.props.classes.primary_log}>
                    <Grid key={`stoolType${Math.random() * 1000000}`} item xs={12} ><span className={this.props.classes.valueLabelStool} role='img' aria-label='stool - normal' >&#128169;</span></Grid>
                    <Grid key={`stoolType${Math.random() * 1000000}`} item xs={12} ><span className={this.props.classes.valueLabel}>Norm</span></Grid>
                </Grid>
            )
        }
    }


    renderDaysOfWeek(){
        return (


                <Grid container item xs={12} direction='column' className={this.props.classes.root_content}>
                    <Grid container justify='center' item xs={12}>
                    <FormGroup row>
                        <Grid item xs={12}>
                        <FormControlLabel
                        control={
                            <Checkbox
                            checked={this.state.secondary}
                            onChange={(event) => this.setSecondary(event.target.checked)}
                            />
                        }
                        label="Enable secondary text"
                        />
                        </Grid>
                    </FormGroup>
                    </Grid>                    
                    <Grid container item xs={12}>
                            <List dense={this.state.dense} style={{width: '100%'}}>
                            {this.generate()}
                            </List>
                    </Grid>
                </Grid>
        )
    }


    renderLogList() {
        let i=0;
        return this.props.logs.reverse().map(log => {
            return (
                <Grid
                    container
                    item
                    xs={12}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    key={i++}                    
                    >
                        <Card>        
                            <Grid   container item xs={12}
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                style={{ minHeight: 'fit-content' }}>   
                                <CardContent>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item xs={12}>
                                    <h4 className="card-title">Stool type: {this.valueLabelStoolType(log.stool_type)}</h4>
                                    </Grid>
                                </Grid>
                                </CardContent>
                                    <Grid container item xs={12} justify="center" alignItems="center" className="margin-btm-sml">

                                        <Grid item xs={5} >                
                                            <h5>Pain Level: {this.valueLabelPainLvl(log.pain_lvl)}</h5>
                                        </Grid>
                                        <Grid item xs={1}/>
                                        <Grid item xs={6} >
                                            <h5>bloodiness: {this.valueLabelBloodiness(log.bloodiness)}</h5>
                                        </Grid>
                                    </Grid>
                            </Grid>
                        </Card>
                </Grid>
            );
        });
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
                                color='primary'
                                >                                       
                                Weekly                                         
                            </Button> 
                            <Button 
                                key='2' 
                                component={Link}
                                to='/log_cal'
                                className={this.props.classes.btn_font}
                                // startIcon={}
                                >                                       
                                Monthly                                          
                            </Button> 

                        </ButtonGroup>

                    </Grid>
                    <Grid container item xs={12} 
                            direction='column' 
                            justify='center' 
                            align='center' 
                            style={{marginBottom: '3rem'}}>
                        {this.renderDaysOfWeek()}
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

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { fetchLogs, deleteLog })(LogList));

// export function Component() {
//     let menuContext = useContext(MenuDrawerContext);
  
//     return <LogList appContext={appContext}></LogList>
//   };