import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';

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
                    <li key='2'><a className='log-in-btn' href='/auth/google'>Login with Google</a></li>
                ]
            // if there is user data
            default:
                return [
                    //satify the react key requirement
                    <li key='1'><Link id='new-list' className='btn dash-btn sidenav-close' to='/'>Just went!</Link></li>,
                    <li key='2'><Link className='btn dash-btn sidenav-close' to='/tagLists'>Log list</Link></li>,
                    <li key='3'><a className='btn logout-btn sidenav-close' href='/api/logout'>Calendar</a></li>                    
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