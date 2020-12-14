import React from 'react';

import M from "materialize-css";

export default ({input, label, className, meta: { error, touched }}) => {
    return (
        <div>
            <label style={{fontSize: '2rem',
                            color: '#000000',
                            fontWeight: "800"}}>
                {label}
            </label>
            <input type="text" className={className} style={{marginBottom:'.2em'}} {...input}/>

            <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>

        </div>
        // ,
        // <div>
        //     <label style={{fontSize: '2rem',
        //                     color: '#000000',
        //                     fontWeight: "800"}}>
        //         {label}
        //     </label>
        //     <input type="text" className="timepicker" style={{marginBottom:'.2em'}} {...input}/>
        //     <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>

        // </div>
    );
}