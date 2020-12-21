import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogs, deleteLog } from '../actions/index';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/styles';

let drawerWidth = 240;

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
    },
    sit_on_top: {
      zIndex: "9000",
    },
    input_on_line: {

    },
    'slider_img': {
      width: '2rem',    
      height: 'auto',
    },
    log_card: {
        marginBottom: '1rem',       
        [theme.breakpoints.down('sm')]: {
            minWidth: '90vw',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: `calc(60vw - ${drawerWidth}px)`,          
        },
    }
  });

class LogList extends Component {

    constructor(props){
        super(props)
        this.state = {

        }

        this.valueLabelBloodiness = this.valueLabelBloodiness.bind(this);
        this.valueLabelPainLvl = this.valueLabelPainLvl.bind(this);
        this.valueLabelStoolType = this.valueLabelStoolType.bind(this);

    }

    componentDidMount() {
        this.props.fetchLogs();

    }

    valueLabelBloodiness(value){
        
        if(value === 1) {
            return (
                <span className={this.props.classes.valueLabelBlood}>
                    <img className={this.props.classes.slider_img} src='/assets/bloodiness/NoBlood.png'/>
                    <span>&nbsp;No</span>
                </span>)
        }
        else if(value === 2) {
            return (
                <span className={this.props.classes.valueLabelBlood}>
                    <img className={this.props.classes.slider_img} src='/assets/bloodiness/Bloody.png' />
                    <span>&nbsp;A Little</span>
                </span>)
        }
        else {
            return (
                <span className={this.props.classes.valueLabelBlood}>
                    <img className={this.props.classes.slider_img} src='/assets/bloodiness/SuperBloody.png' />
                    <span>&nbsp;Lots</span>
                </span>)
        }
    }
    valueLabelStoolType(value){
        if(value === 1) {
            return <span className={this.props.classes.valueLabelStool} >&#128166; Wet</span>
        }
        else if(value === 3) {
            return <span className={this.props.classes.valueLabelStool} >&#127761; Dry</span>
        }
        else {
            return <span className={this.props.classes.valueLabelStool} >&#128169; Normal</span>
        }
    }
    valueLabelPainLvl(value){
        if(value === 1) {
            return <span className={this.props.classes.valueLabelPain} >&#128557; Painful</span>
        }
        else if(value === 2) {
            return <span className={this.props.classes.valueLabelPain} >&#128577; A little</span>

        }
        else {
            return <span className={this.props.classes.valueLabelPain} >&#128522; No</span>
        }
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
                        <Card className={this.props.classes.log_card}>        
                            <Grid   container item
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
            <div className={this.props.root_content}>
                <Grid container direction='column' justify='center' align='center'>
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center'>Your Logs</Typography>
                    </Grid>
                    <Grid container item xs={12} direction='column' justify='center' align='center'>
                        {this.renderLogList()}
                    </Grid>
                </Grid>
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