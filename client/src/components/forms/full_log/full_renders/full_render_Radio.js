import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import formFields from '../full_fields/full_fields_2';
import StoolFormComp from '../full_components/full_comp_2';

export default function renderFields() {

    return _.map(formFields, ({ label, name, className, options, default_val }) => {
        return (
        <Field className={className} 
               key={name} 
               label={label} 
               name={name} 
               component={StoolFormComp} 
               type='radio'
               default_val={default_val}
               options={options}
               />

        )
    });
}