// SurveyNew show SurveyForm component and SurveyFormReviewComponent
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form';
import Full_form_1 from './Full_form_1';
import Full_form_2 from './Full_form_2';
import axios from 'axios';

// import Utils from '../../../helpers/Helpers'
import { withStyles } from '@material-ui/core/styles';

let drawerWidth = 240;

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    hours = hours < 10 ? '0'+hours : hours;
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ':' + minutes;
    return strTime;
}

function formatMMDDYY(date) {
    // return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear());
    return (date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())));
}

const styles = theme => ({
    root_content: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '90vh',
            minWidth: '100vw',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: `calc(100vw - ${drawerWidth}px)`,
        },
    },
    sit_on_top: {
      zIndex: "9000",
    },
    input_on_line: {

    }
  });

class Full_Form_Wizard extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            formPath: this.props.match.path.split(':')[0],
            formPage: parseInt(this.props.match.params.page, 10),
            formHistory: [], 
        }
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);

    }

    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (parseInt(this.props.match.params.page, 10) !== parseInt(prevProps.match.params.page, 10)) { 
            this.setState({ 
                formPage: parseInt(this.props.match.params.page, 10),
                formHistory: [...prevState.formHistory, prevState.formPage],
            }); 
           // or any other logic..
         }
    }


    nextPage() {
        this.setState((prevState) => ({
            formPage: prevState.formPage + 1
        }), () => {
            
            // console.log(`${this.state.formPath}${( this.state.formPage)}`);
            this.props.history.push(`${this.state.formPath}${( this.state.formPage)}`)
        })
    }
    prevPage() {
        this.setState((prevState) => ({
            formPage: prevState.formPage - 1
        }), () => {
            // console.log(`${this.state.formPath}${( this.state.formPage)}`);
            this.props.history.push(`${this.state.formPath}${( this.state.formPage)}`)
        })
    }


    renderContent() {
        // console.log(this.state);
        // console.log(this.props);
        switch(this.state.formPage){
            case 1:
                return (
                    <Full_form_2
                        onSubmit = {() => this.prevPage()}
                        prevPage = {() => this.prevPage()}
                        goBack = {() => this.props.history.goBack()}
                        />
                )
            default:
                return (
                    
                        <Full_form_1 
                            nextPage={() => this.nextPage()}
                            goBack = {() => this.props.history.goBack()}
                            formHistory={this.state.formHistory}
                        />
                )

        }
    }
    render(){
        return (
            <div className={this.props.classes.root_content}>                
                {this.renderContent()}
            </div>
        );
    }
}


export default withStyles(styles, { withTheme: true })(reduxForm({
    // doing this allows the clearing of values when surveyNew is unmounted (default behavior)
    form: 'Full_Log_Form',
    initialValues: {
        date_time: `${formatMMDDYY(new Date)}T${formatAMPM(new Date)}`,
        urgency: '1'
    }
})(Full_Form_Wizard));