import React from 'react'
import { Field } from 'redux-form';
import date_comp from '../iL_components/iL_date_comp'
import slider_comp from '../iL_components/iL_slider_comp'
import form_fields from '../iL_fields/iL_fields'

function render_iL_fields(props) {

    function gen_fields({name, label, type, comp}) {
        return (
            <Field 
                name={name} 
                key={name} 
                label={label} 
                type={type} 
                component={comp === 'slider' ? slider_comp : date_comp}
                />
        )
    }

    let rendered_fields = form_fields.map((field) => gen_fields(field));

    return rendered_fields;
}

export default render_iL_fields;