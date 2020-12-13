import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';

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
                    <li key='2'><a className='log-in-btn' href='/auth/google'><img src='/assets/sign-in-images/btn_google_signin_dark_normal_web@2x.png'/></a></li>
                ]
            // if there is user data
            default:
                return [
                    //satify the react key requirement
                    <li key='1'><Link id='new-list' className='btn dash-btn sidenav-close' to='/add_stool'>Just went!</Link></li>,
                    <li key='2'><Link className='btn dash-btn sidenav-close' to='/log_list'>Log list</Link></li>,
                    <li key='3'><Link className='btn dash-btn sidenav-close' to='/log_cal'>Calendar</Link></li>,   
                    <li key='4'><a className='btn logout-btn sidenav-close' href='/api/logout'>Logout</a></li>                     
                 
                ]
        }
    }
    
    

    render() {
        return (
            <div>
                <nav id='navbar' className=''>
                    <div className="nav-wrapper">
                        <div className="brand-logo">
                            <a href='/'
                            className="black-text"
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            >
                                <img src='/stool-squad.png' style={{height: '2rem', marginRight: '.5rem', width: 'auto'}}></img> 
                                <span>Stool Story</span>
                            </a>
                        </div>
                        <SideNav>
                                {this.renderContent()}
                        </SideNav>
                    </div>                    
                </nav>
                <div className="hide-on-large-only fixed-action-btn">
                    <div data-target="slide-out" className="sidenav-trigger btn-floating">
                        <i className="material-icons">menu</i>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }){
    return { auth };
};
export default connect(mapStateToProps)(Header);