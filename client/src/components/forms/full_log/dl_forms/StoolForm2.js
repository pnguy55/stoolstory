import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../../../actions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import renderFields from '../dl_renders/renderFieldsRadio'

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root_content: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '90vh',
            minWidth: '100vw',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: `calc(100vw - ${drawerWidth}px)`,            
            minHeight: '90vh',
        },
    },
    loading_msg: {
      textAlign: 'center',
      display: 'block',
    },
    landing_greeting: {
        textAlign: 'center',

    },
    card_content: {
        marginBottom: '2rem',
    }
  }));

let StoolForm2 = ({ handleSubmit, formValues, prevPage, nextPage  }) => {
    const classes = useStyles();

    // useEffect(() => {
    //     console.log(formValues)
    // }, []);


    return (  
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.root_content}>   
            <form id='stool-form-2' style={{margin: "1rem"}} onSubmit={handleSubmit}>
                <Card>        
                    <Grid container item
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: 'fit-content' }}>   
                        <CardContent className={classes.card_content}>
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
        formValues: state.form.stoolForm.values
    };
}

// we are using withRouter to redirect
StoolForm2 = connect(
    mapStateToProps,
    actions
)(StoolForm2);

export default reduxForm({
    form: 'stoolForm', // a unique name for this form
    destroyOnUnmount: false
})(StoolForm2);