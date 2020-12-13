import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import formFields from './formFields1';
import StoolFormComp from './StoolFormComp1';

export default function renderFields() {
    return _.map(formFields, ({ label, name }) => {
        return <Field key={name} label={label} name={name} component={StoolFormComp} type='text' />
    });
}