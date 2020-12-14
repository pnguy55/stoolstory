// SurveyNew show SurveyForm compnent and SurveyFormReviewComponent
import React, { Component } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form';
import StoolForm1 from './StoolForm1';
import StoolForm2 from './StoolForm2';
import StoolForm3 from './StoolForm3';
import axios from 'axios';
import M from "materialize-css";


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



    renderContent() {
        switch(this.state.stoolFormWizardProgress){
            case 1:
                return (
                    <StoolForm2
                        onCancel={() => this.setState({ stoolFormWizardProgress: this.state.stoolFormWizardProgress - 1 })}
                        onSubmit={() => this.setState({ stoolFormWizardProgress: this.state.stoolFormWizardProgress + 1 })}
                    >

                    </StoolForm2>);
            case 2: return (
                    <StoolForm3
                        onCancel={() => this.setState({ stoolFormWizardProgress: this.state.stoolFormWizardProgress - 1 })}                    >

                    </StoolForm3>
            )
            default:
                return (
                    <StoolForm1 onStoolFormSubmit={() => this.setState({ stoolFormWizardProgress: this.state.stoolFormWizardProgress + 1 })}
                                    
                    >

                    </StoolForm1>);

        }
    }
    render(){
        return (
            <div className='container'>
                {this.renderContent()}
            </div>
        );
    }
}


export default reduxForm({
    // doing this allows the clearing of values when surveyNew is unmounted (default behavior)
    form: 'stoolForm'
})(StoolFormWizard);