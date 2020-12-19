import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import formFields from '../dl_fields/formFields1';
import StoolFormComp from '../dl_components/StoolFormComp1';

export default function renderFields() {

    return _.map(formFields, ({ label, name, className }) => {
        return <Field className={className} key={name} label={label} name={name} component={StoolFormComp} type='text' /> 
    });
}