import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import LogList from './LogList';
import LogCal from './LogCal';
import StoolFormWizard from './forms/stoolForm/StoolFormWizard';

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
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/add_stool' component={StoolFormWizard} />
                        {/* <Route exact path='/' component={mainUserView}/> */}
                        <Route exact path='/log_list' component={LogList} />
                        <Route exact path='/log_cal' component={LogCal} />
                        {/* <Route path='/tagLists/new' component={TagListWizard} /> */}
                    </div>
                </HashRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);