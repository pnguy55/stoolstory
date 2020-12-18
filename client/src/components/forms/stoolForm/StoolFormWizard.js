// SurveyNew show SurveyForm compnent and SurveyFormReviewComponent
import React, { Component } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form';
import StoolForm1 from './StoolForm1';
import StoolForm2 from './StoolForm2';
import StoolForm3 from './StoolForm3';
import axios from 'axios';
import Helpers from '../../helpers/helpers';

import theme from '../../style/theme';
import { ThemeProvider, useTheme, withStyles } from '@material-ui/core/styles';

let drawerWidth = 240;
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

class StoolFormWizard extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            formPath: this.props.match.path.split(':')[0],
            formPage: parseInt(this.props.match.params.page, 10),
            formHistory: [], 
            stoolFormWizardProgress: 0,
            videoList: [],
            videoTitle: '',
            wholeListOfTags: [],
            listOfChosenTags: [],
            listOfChosenTagBubbles: '',
            letterCount: 0
        }
        // this.getRelatedVideos = this.getRelatedVideos.bind(this);
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
            
            console.log(`${this.state.formPath}${( this.state.formPage)}`);
            this.props.history.push(`${this.state.formPath}${( this.state.formPage)}`)
        })
    }
    prevPage() {
        this.setState((prevState) => ({
            formPage: prevState.formPage - 1
        }), () => {
            console.log(`${this.state.formPath}${( this.state.formPage)}`);
            this.props.history.push(`${this.state.formPath}${( this.state.formPage)}`)
        })
    }


    renderContent() {
        console.log(this.state);
        console.log(this.props);
        switch(this.state.formPage){
            case 1:
                return (
                    <StoolForm2
                        prevPage = {() => this.prevPage()}
                        nextPage = {() => this.nextPage()}
                        goBack = {() => this.props.history.goBack()}
                        />
                )
            case 2: 
                return (
                    <StoolForm3
                    prevPage = {() => this.prevPage()}
                    nextPage = {() => this.nextPage()}
                    />
                )
            default:
                return (
                    
                        <StoolForm1 
                            nextPage={() => this.nextPage()}
                            goBack = {() => this.props.history.goBack()}
                            formHistory={this.state.formHistory}
                        />
                )

        }
    }
    render(){
        return (
            <div>                
                {this.renderContent()}
            </div>
        );
    }
}


export default withStyles(styles, { withTheme: true })(reduxForm({
    // doing this allows the clearing of values when surveyNew is unmounted (default behavior)
    form: 'stoolForm',
    initialValues: {
        date_time: `${Helpers.formatMMDDYY(new Date)}T${Helpers.formatAMPM(new Date)}`,
        urgency: false
    }
})(StoolFormWizard));