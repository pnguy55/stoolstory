// SurveyNew show SurveyForm compnent and SurveyFormReviewComponent
import React, { Component } from 'react';
//import _ from 'lodash'
import { Field, reduxForm } from 'redux-form';
//import axios from 'axios';



const StoolSquadForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <Field name="sex" component="input" type="radio" value="male" />{' '}
              Male
            </label>
            <label>
              <Field name="sex" component="input" type="radio" value="female" />{' '}
              Female
            </label>
            <label>
              <Field name="sex" component="input" type="radio" value="other" />{' '}
              Other
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <Field name="favoriteColor" component="select">
              <option />
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </Field>
          </div>
        </div>
        <div>
          <label htmlFor="employed">Employed</label>
          <div>
            <Field
              name="employed"
              id="employed"
              component="input"
              type="checkbox"
            />
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <Field name="notes" component="textarea" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }


export default reduxForm({
    // doing this allows the clearing of values when surveyNew is unmounted (default behavior)
    form: 'StoolSquadForm'
})(StoolSquadForm);