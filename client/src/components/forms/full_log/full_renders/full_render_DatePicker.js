import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import formFields from '../full_fields/full_fields_1';
import StoolFormComp from '../full_components/full_comp_1';

export default function renderFields() {

    return _.map(formFields, ({ label, name, className }) => {
        return <Field className={className} key={name} label={label} name={name} component={StoolFormComp} type='text' /> 
    });
}