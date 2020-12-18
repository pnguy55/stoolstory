import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import formFields from './formFields2';
import StoolFormComp from './StoolFormComp2';

export default function renderFields() {

    return _.map(formFields, ({ label, name, className }) => {
        return <Field className={className} key={name} label={label} name={name} component={StoolFormComp} type='checkbox' /> 
    });
}