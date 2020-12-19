import React from 'react';
import { validate_insta_log } from '../../../helpers/Validate_insta_log';
import renderFields from '../iL_renders/render_iL_fields';
import { reduxForm } from 'redux-form';

import Grid from '@material-ui/core/Grid';

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


const Insta_Log = props => {

    const classes = useStyles();
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <Grid className={classes.root_content} 
            container 
            justify='center' 
            alignItems='center'
            direction='column'
            >
            <form onSubmit={handleSubmit}>
                <Grid container item
                    xs={12}
                    direction='column'
                    justify='center'
                    alignItems='center'
                    >
                    
                    {renderFields()}

                </Grid>
            </form>
        </Grid>
    )
}


export default reduxForm({
    form: 'Insta_Log', // a unique identifier for this form
  })(Insta_Log)
  