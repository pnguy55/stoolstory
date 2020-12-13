import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends Component {
    

    renderContent() {
        // this auth object actually has our user data
        switch (this.props.auth){
            // if the reducer is still loading
            case null:
                return 'Loading';
            // if there is no user data
            case false:
                return [
                    <li key='1' class='landing-pitch'><img src='./assets/landing-scroll.png'/></li>,
                    <li key='2' class='landing-pitch'><h2>Log your logs</h2></li>,
                    <li key='3'><a className='log-in-btn' href='/auth/google'><img src='/assets/sign-in-images/btn_google_signin_dark_normal_web@2x.png'/></a></li>
                ]
            // if there is user data
            default:
                return [
                    //satify the react key requirement
                    <li key='1'><Link id='new-list' className='btn dash-btn sidenav-close' to='/add_stool'>Just went!</Link></li>,
                    <li key='2'><Link className='btn dash-btn sidenav-close' to='/log_list'>Log list</Link></li>,
                    <li key='3'><Link className='btn dash-btn sidenav-close' href='/log_cal'>Calendar</Link></li>                    
                ]
        }
    }
    
    

    render() {
        return (            
                <ul id="landing-list">
                    {this.renderContent()}
                </ul>

        );
    }
}

function mapStateToProps({ auth }){
    return { auth };
};
export default connect(mapStateToProps)(Landing);