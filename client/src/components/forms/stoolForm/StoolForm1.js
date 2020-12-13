// an importable form component
import _ from 'lodash';
import React, { Component } from 'react';
// this import allows it to access the redux-store like a connect helper
// the Field class can represent any input field
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import formFields from './formFields1';
import renderFields from './renderFields1'
import M from "materialize-css";

class StoolForm1 extends Component {    

    render(){
        return (
            <div className=''>
                {/* If onSurveySubmit had () it would call the function the instant the component is rendered */}
                
                <form onSubmit={this.props.handleSubmit(this.props.onStoolFormSubmit)} style={{height: '100%', width: '100%', padding: '1rem'}}>
                    {renderFields()}
                    {  document.addEventListener('DOMContentLoaded', function() {
                        var date_elem = document.querySelectorAll('.datepicker');
                        var date_options = {}
                        var datepicker_instance = M.Datepicker.init(date_elem, date_options);

                        var time_elem = document.querySelectorAll('.timepicker');
                        var time_options = {}
                        var timepicker_instance = M.Timepicker.init(time_elem, time_options);
                        
                    })}
                        <button className="right flex-column btn-soft" style={{padding:'1rem', marginBottom: '.5rem'}} type="submit">
                            <i className="material-icons large">arrow_forward</i>
                        </button>
                </form>
            </div>
        );
    }
}

function validate(values) {

    const errors = {};
    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            errors[name] = `You must provide a ${name}.`;
        }
    });
    // if errors object is empty, it will allow the form to go through
    return errors;
}

export default reduxForm({
    // es6 shorthand for validate:validate
    validate,
    form: 'stoolForm',
    // this property persists values
    destroyOnUnmount: false
})(StoolForm1);