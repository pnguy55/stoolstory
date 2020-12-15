// an importable form component
import _ from 'lodash';
import React, { Component } from 'react';
// this import allows it to access the redux-store like a connect helper
// the Field class can represent any input field
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import formFields from './formFields1';
import renderFields from './renderFields1'

import Helpers from '../../helpers/helpers';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

class StoolForm1 extends Component {    

    componentDidMount(){


    }

    render(){
        return (
            <form style={{margin: "1rem"}} onSubmit={this.props.handleSubmit(this.props.nextPage)}>
                <Card>
                    <Grid container spacing={0} justify="center" alignItems="center">
                        <CardContent>
                        <Grid container item xs={12} justify="center" alignItems="center">
                                {renderFields()}
                        </Grid>
                        </CardContent>
                            <Grid container item xs={12} justify="center" alignItems="center" className="margin-btm-sml">
                                <Grid item xs={3}/>
                                <Grid item xs={3} className='stool-btn link'>
                                    <Link to="/" className='flex-link'>
                                        <HomeRoundedIcon className="stool-btn-icon link" fontSize="large"/>
                                    </Link>
                                </Grid>

                                <Grid item xs={3} className='stool-btn flex-link'>
                                    <Button type="submit">
                                        <ArrowForwardRoundedIcon className="stool-btn-icon" fontSize="large"/>
                                    </Button>
                                </Grid>
                                <Grid item xs={3}/>
                            </Grid>
                    </Grid>
                </Card>
            </form>

        );
    }
}

function validate(values) {


    const errors = {};
    _.each(formFields, ({ date_time }) => {
        if(values[date_time] === `${Helpers.formatMMDDYY(new Date)} ${Helpers.formatAMPM(new Date)}`) {
            errors[date_time] = `You must provide a date/time`;
        }
    });
    // if errors object is empty, it will allow the form to go through
    return errors;
}

export default reduxForm({
    // es6 shorthand for validate:validate
    validate,
    form: 'stoolForm',
    // this property persists values
    destroyOnUnmount: false
})(StoolForm1);



