import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import StoolSquadForm from './stoolSquad/StoolSquadForm';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    };
    render() {
        return (
            <div>
                <HashRouter basename='/'>
                    <div>
                        {/* the exact makes sure that it only shows up on that path */}
                        <Header/>
                        <Route path='/' component={Landing} />
                        <Route exact path='/form' component={StoolSquadForm} />
                        {/* <Route exact path='/' component={mainUserView}/> */}
                        <Route exact path='/tagLists' component={Dashboard} />
                        {/* <Route path='/tagLists/new' component={TagListWizard} /> */}
                    </div>
                </HashRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);