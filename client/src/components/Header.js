import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResponsiveDrawer from './ResponsiveDrawer';
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
                    {to: '/auth/google', text: 'Log in', img:'/assets/sign-in-images/btn_google_signin_dark_normal_web@2x.png', bottom: 'true'}
                ]
            // if there is user data
            default:
                return [
                    //satify the react key requirement
                    // <li key='1'><Link id='new-list' className='btn dash-btn sidenav-close' to='/add_stool'>Just went!</Link></li>,
                    // <li key='2'><Link className='btn dash-btn sidenav-close' to='/log_list'>Log list</Link></li>,
                    // <li key='3'><Link className='btn dash-btn sidenav-close' to='/log_cal'>Calendar</Link></li>,   
                    // <li key='4'><a className='btn logout-btn sidenav-close' href='/api/logout'>Logout</a></li> 
                    {to: '/full_log/0', text: 'Full Log', link: true, type: 'log', bottom: true},
                    {to: '/insta_log/', text: 'Insta-Log', link: true, type: 'log', bottom: true},
                    {to: '/log_list', text: 'Log List', link: true, type: 'show', bottom: true},
                    {to: '/log_cal', text: 'Calendar', link: true, type: 'show', bottom: false},
                    {to: '/api/logout', text: 'Log out', link: false, bottom: false}
                    ,     
                ]
        }
    }
    
    render() {
        const { auth } = this.props;
        return (
            <div>
                <ResponsiveDrawer auth={auth}>
                    {this.renderContent()}
                </ResponsiveDrawer>      
            </div>
        );
    }
}

function mapStateToProps({ auth }){
    return { auth };
};
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Header));