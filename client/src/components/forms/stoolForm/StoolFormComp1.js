import React from 'react';

export default ({input, label, meta: { error, touched }}) => {
    return (
        <div>
            <label style={{fontSize: '2rem',
                            color: '#000000',
                            fontWeight: "800"}}>
                {label}
            </label>
            <input type="text" class="datepicker" style={{marginBottom:'.2em'}} {...input}/>
            <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>
        </div>,
        <div>
            <label style={{fontSize: '2rem',
                            color: '#000000',
                            fontWeight: "800"}}>
                {label}
            </label>
            <input type="text" class="timepicker" style={{marginBottom:'.2em'}} {...input}/>
            <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>
        </div>
    );
}