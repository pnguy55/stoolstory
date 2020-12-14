import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import formFields from './formFields1';
import StoolFormComp from './StoolFormComp1';
import Helpers from '../../helpers/helpers';

export default function renderFields() {

    let date = new Date;

    let AMPM = Helpers.formatAMPM(date);
    let MMDDYY = Helpers.formatMMDDYY(date);


    return _.map(formFields, ({ label, name, className }) => {
        return <Field className={className} key={name} label={label} name={name} component={StoolFormComp} type='text' /> 
    });
}