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
import Helpers from '../../helpers/helpers';

class StoolForm1 extends Component {    

    componentDidMount(){
            document.addEventListener('DOMContentLoaded', function() {
                var date_elems = document.querySelectorAll('.datepicker');
                console.log(date_elems)
                M.Datepicker.init(date_elems, {});

                var time_elems = document.querySelectorAll('.timepicker');
                M.Timepicker.init(time_elems, {
                });
            })

    }
    

    render(){
        return (
            <form className='stoolform' onSubmit={this.props.handleSubmit(this.props.nextPage)} style={{height: '100%', width: '100%', padding: '1rem'}}>
                {renderFields()}
                    <div className='row'>
                        <Link className="col s6 btn-soft" style={{padding:'1rem', marginBottom: '.5rem'}} to="/">
                            <i className="home material-icons large">home</i>
                        </Link>
                        <button className="col s6" style={{padding:'1rem', marginBottom: '.5rem'}} type="submit">
                            <i className="material-icons large">arrow_forward</i>
                        </button>
                    </div>
            </form>
        );
    }
}

function validate(values) {


    const errors = {};
    _.each(formFields, ({ date_time }) => {
        if(values[date_time] === `${Helpers.formatMMDDYY(new Date)} ${Helpers.formatAMPM(new Date)}`) {
            errors[date_time] = `You must provide a date/time`;
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



