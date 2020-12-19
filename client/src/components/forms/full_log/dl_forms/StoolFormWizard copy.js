// SurveyNew show SurveyForm compnent and SurveyFormReviewComponent
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
        this.state = {
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
    
    componentDidMount() {
        
    }
    // getRelatedVideos(videoTitle){
    //     let currentComponent = this;

    //     axios.get(`/api/taglists/gatherVideoList/${videoTitle}`)
    //     .then(function (videoList) {

    //         currentComponent.setState({
    //             videoList
    //         })

    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    // }
    nextPage() {
        this.setState({
            stoolFormWizardProgress: this.state.stoolFormWizardProgress + 1
        })
    }
    prevPage() {
        this.setState({
            stoolFormWizardProgress: this.state.stoolFormWizardProgress - 1
        })
    }

    renderContent() {

        switch(this.state.stoolFormWizardProgress){
            case 1:
                return (
                    <Route 
                    exact path='/add_log/log_urgency' 
                    render={(props) => (
                      <ThemeProvider theme={theme} >
                          <StoolForm2 
                            {...props} 
                            prevPage={() => this.prevPage()}
                            nextPage={() => this.nextPage()} 
                            />
                      </ThemeProvider>
                    )}  />
                );
            case 2: return (
                    <StoolForm3
                        onCancel={() => this.setState({ stoolFormWizardProgress: this.state.stoolFormWizardProgress - 1 })}                    >

                    </StoolForm3>
            )
            default:
                return (
                    <Route 
                    exact path='/add_log/log_time' 
                    render={(props) => (
                      <ThemeProvider theme={theme} >
                          <StoolForm1 
                            {...props} 
                            nextPage={() => this.nextPage()} 
                            />
                      </ThemeProvider>
                    )}  />
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
        date_time: `${Helpers.formatMMDDYY(new Date)}T${Helpers.formatAMPM(new Date)}`
    }
})(StoolFormWizard));