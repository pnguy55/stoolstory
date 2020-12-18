import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/index';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import formFields from './formFields2';
import renderFields from './renderFields2'

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root_content: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '90vh',
            minWidth: '100vw',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: `calc(100vw - ${drawerWidth}px)`,
        },
    },
    loading_msg: {
      textAlign: 'center',
      display: 'block',
    },
    landing_greeting: {
        textAlign: 'center',

    },
  }));

let StoolForm2 = ({ handleSubmit, formValues, prevPage, nextPage  }) => {
    const classes = useStyles();

    // useEffect(() => {
    //     getRelatedVideosHandler(formValues['title'])
    //     console.log(formValues)
    // }, [formValues['title']]);

    // useEffect(() => {
    //     console.log(formValues)
    // }, [formValues]);

    // const reviewFields = _.map(formFields, ({ name, label }) => {
    //     return (
    //         <div key={name}>
    //             <div className='flow-text' style={{fontSize: '4rem'}}>"{formValues[name]}"</div>
    //         </div>
    //     );
    // })

    // const form_buttons = () => {
    //     return(
    //         <div className='row'>
    //                 <div className='soft-outter btn-wrapper col s5 m4 offset-m1 l3 offset-l2'>
    //                     <a className="page-2-btn soft-inner btn-soft" href='/'>
    //                         <i className="material-icons large">arrow_backward</i>
    //                     </a>
    //                 </div>
    //                 <div className='soft-outter btn-wrapper col s5 offset-s2 m4 offset-m3 l3 offset-l2'>
    //                     <button type="submit" className="page-2-btn soft-inner btn-soft">
    //                         <i className="material-icons large">arrow_forward</i>
    //                     </button>
    //                 </div>
    //         </div>
    //     )
    // }

    // const generateChoices = _.map(videoList.data, ({ videoIndex, title, videoId, videoURL, thumbnail, channelTitle, channelURL }) => {
    //     return (
    //         <div className='col s12 m5 l5 offset-m1 offset-l1' style={{textAlign:'center'}}>
    //             <div className='soft-outter' style={{borderRadius:'100%',width:'fit-content',marginLeft:'40%'}}>
    //                 <div className='soft-inner' style={{borderRadius:'100%'}}>
    //                     <h4 style={{padding:'1rem 1.5rem',margin:'0px'}}>{videoIndex}</h4>
    //                 </div>
    //             </div>
    //             <div key={videoId} className='soft-outter' style={{padding: '0px'}}>
    //                 <div className='soft-outter card' style={{backgroundColor: "var(--softBackground)", width: '100%', height: '100%'}}>
    //                     <div className='card card-image' key={videoId} style={{display: 'flex', flexDirection: 'column'}}>
    //                         <img src={thumbnail} alt={title + " thumbnail"} style={{height: 'auto', width: '100%'}} />
    //                         <a href={channelURL} target="_blank" rel='noopener noreferrer' className='card-title black white-text' style={{padding:'5px', fontSize:'1rem'}}>{channelTitle}<i className='material-icons right'>open_in_new</i></a>
    //                     </div>
    //                     <div className='card-content container flex-column' style={{padding:'0px 3px'}}>
                            
    //                         <YoutubeModal videoId={videoId} >
    //                             <button className='row btn red darken-4' type="button"><span className="col s9" style={{}}>Watch</span><i className='material-icons right col s3'>open_in_new</i></button>
    //                         </YoutubeModal>
                                                                    
    //                         <label className='row card-checkbox' style={{display:'flex', alignItems:'center'}}>
    //                             <Field name={videoId} id={videoId} component='input' type='checkbox'></Field>
    //                             <span className='flow-text col s12 black-text'>{title}</span>
    //                         </label>
                            
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // })
    
    return (  
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.root_content}>   
            <form id='stool-form-2' style={{margin: "1rem"}} onSubmit={handleSubmit(prevPage)}>
                <Card>        
                    <Grid   container
                        spacing={1}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: 'fit-content' }}>   
                        <CardContent>
                                {renderFields()}
                        </CardContent>
                            <Grid container item xs={12} justify="center" alignItems="center" className="margin-btm-sml">
                                <Grid item xs={1}/>
                                <Grid item xs={3} className='stool-btn flex-link'>
                                    <Button onClick={prevPage}>
                                        <ArrowBackRoundedIcon className="stool-btn-icon" fontSize="large"/>
                                    </Button>
                                </Grid>
                                <Grid item xs={4}/>
                                <Grid item xs={3} className='stool-btn flex-link'>
                                    <Button type="submit">
                                        <ArrowForwardRoundedIcon className="stool-btn-icon" fontSize="large"/>
                                    </Button>
                                </Grid>
                                <Grid item xs={1}/>
                            </Grid>
                    </Grid>
                </Card>
            </form>
        </Grid>          
        // <Card>
        //     <form style={{margin: "1rem"}} onSubmit={handleSubmit(nextPage)}>
        //         <Grid container spacing={0} justify="center" alignItems="center">
        //             <CardContent>
        //                 <Grid container item xs={12} justify="center" alignItems="center">
        //                         {/* {renderFields()} */}
        //                 </Grid>
        //             </CardContent>
                    
        //             <Grid container item xs={12} justify="center" alignItems="center" className="margin-btm-sml">
        //                     {/* <Grid item xs={1}/> */}
        //                     <Grid item xs={6}>
        //                         <Button onClick={prevPage} className='stool-btn'>
        //                             <ArrowBackRoundedIcon className="stool-btn-icon" fontSize="large"/>
        //                         </Button>
        //                     </Grid>                            
        //                     {/* <Grid item xs={4}/> */}
        //                     <Grid item xs={6}>
        //                         <Button type="submit" className='stool-btn'>
        //                             <ArrowForwardRoundedIcon className="stool-btn-icon" fontSize="large" />
        //                         </Button>
        //                     </Grid>
        //                     {/* <Grid item xs={1}/> */}
        //             </Grid>
        //         </Grid>
        //     </form>
        // </Card>
    );
};



function mapStateToProps(state) {
    return {
        formValues: state.form.stoolForm
    };
}

function validate(values) {

    console.log(values)
    const errors = {};
    _.each(formFields, ({ urgency }) => {
        console.log(values)
    });
    // if errors object is empty, it will allow the form to go through
    return errors;
}
// we are using withRouter to redirect
StoolForm2 = connect(
    mapStateToProps,
    actions
)(StoolForm2);

export default reduxForm({
    validate,
    form: 'stoolForm', // a unique name for this form
    destroyOnUnmount: false
})(StoolForm2);