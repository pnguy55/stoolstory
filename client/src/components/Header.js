import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ResponsiveDrawer from './ResponsiveDrawer';
import BottomNav from './BottomNav';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    sit_on_top: {
      zIndex: "9000",
    }
  });


class Header extends Component {
    
    
    renderContent() {

        // this auth object actually has our user data
        switch (this.props.auth){
            // if the reducer is still loading
            case null:
                return 'Loading';
            // if there is no user data
            case false:
                return [
                    // <li key='2'><a className='log-in-btn' href='/auth/google'><img src='/assets/sign-in-images/btn_google_signin_dark_normal_web@2x.png'/></a></li>
                    {to: '/auth/google', text: 'Log in', img:'/assets/sign-in-images/btn_google_signin_dark_normal_web@2x.png'}
                ]
            // if there is user data
            default:
                return [
                    //satify the react key requirement
                    // <li key='1'><Link id='new-list' className='btn dash-btn sidenav-close' to='/add_stool'>Just went!</Link></li>,
                    // <li key='2'><Link className='btn dash-btn sidenav-close' to='/log_list'>Log list</Link></li>,
                    // <li key='3'><Link className='btn dash-btn sidenav-close' to='/log_cal'>Calendar</Link></li>,   
                    // <li key='4'><a className='btn logout-btn sidenav-close' href='/api/logout'>Logout</a></li> 
                    {to: '/add_log', text: 'Add Log!', link: true},
                    {to: '/log_list', text: 'Log List', link: true},
                    {to: '/log_cal', text: 'Calendar', link: true},
                    {to: '/api/logout', text: 'Log out', link: false},     
                ]
        }
    }

    render() {
        const { classes, auth } = this.props;
        return (
            <div>
                <ResponsiveDrawer auth={auth}>
                    {this.renderContent()}
                </ResponsiveDrawer>      
                <Hidden smUp>
                    <BottomNav>
                        {this.renderContent()}
                    </BottomNav>
                </Hidden>
            </div>
        );
    }
}

function mapStateToProps({ auth }){
    return { auth };
};
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Header));