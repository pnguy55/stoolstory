import React from 'react'
import { Field } from 'redux-form';
import insta_date_comp from '../insta_components/insta_date_comp'
import insta_slider_comp from '../insta_components/insta_slider_comp'
import insta_fields from '../insta_fields/insta_fields'

function render_iL_fields(props) {

    function gen_fields({name, label, type, comp}) {
        return (
            <Field 
                name={name} 
                key={name} 
                label={label} 
                type={type} 
                component={comp === 'slider' ? insta_slider_comp : insta_date_comp}
                />
        )
    }

    let rendered_fields = insta_fields.map((field) => gen_fields(field));

    return rendered_fields;
}

export default render_iL_fields;