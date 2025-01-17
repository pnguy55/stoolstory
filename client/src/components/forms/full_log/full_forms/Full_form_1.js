// an importable form component
import _ from 'lodash';
import React, { Component } from 'react';
// this import allows it to access the redux-store like a connect helper
// the Field class can represent any input field
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import full_fields_1 from '../full_fields/full_fields_1';
import full_render_DatePicker from '../full_renders/full_render_DatePicker'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import { withStyles } from "@material-ui/core/styles";
const drawerWidth = 240;

const styles = theme => ({
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
    sit_on_top: {
      zIndex: "9000",
    },
    input_on_line: {

    }
  });

  const submit = values => {
    console.log(values);
  };

class StoolForm1 extends Component {    

    componentDidMount(){

    }
    

    render(){
        
        const { classes, handleSubmit, nextPage, goBack, formHistory } = this.props;
        return (
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.root_content}>   
                <form id='stool_form_1' style={{margin: "1rem"}} onSubmit={handleSubmit(nextPage)}>
                    <Card>        
                        <Grid   container item
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: 'fit-content' }}>   
                            <CardContent>
                            <Grid container justify="center" alignItems="center">
                                <Grid item xs={12}>
                                    {full_render_DatePicker()}
                                </Grid>
                            </Grid>
                            </CardContent>
                                <Grid container item xs={12} justify="center" alignItems="center" className="margin-btm-sml">
                                    <Grid item xs={1}/>
                                    <Grid item xs={3} className='stool-btn flex-link'>
              
                                        <Button component={Link} to='/'>
                                            <KeyboardReturnIcon className="stool-btn-icon" fontSize="large"/>
                                        </Button>

                                        
                                    </Grid>
                                    <Grid item xs={4}/>
                                    <Grid item xs={3} className='stool-btn flex-link'>
                                        <Button 
                                            type="submit">
                                            <ArrowForwardRoundedIcon className="stool-btn-icon" fontSize="large"/>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={1}/>
                                </Grid>
                        </Grid>
                    </Card>
                </form>
            </Grid>

        );
    }
}

function validate(values) {

    const errors = {};
    _.each(full_fields_1, ({ date_time }) => {
    });
    // if errors object is empty, it will allow the form to go through
    return errors;
}

export default withStyles(styles, { withTheme: true })(reduxForm({
    // es6 shorthand for validate:validate
    validate,
    form: 'Full_Log_Form',
    // this property persists values
    destroyOnUnmount: false
})(StoolForm1));



