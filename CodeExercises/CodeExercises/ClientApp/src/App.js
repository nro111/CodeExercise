import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ArrayCompare } from './components/ArrayCompare';
import { RotateString } from './components/RotateString';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route path='/array-compare' component={ArrayCompare} />
                <Route path='/rotate-string' component={RotateString} />
            </Layout>
        );
    }
}
