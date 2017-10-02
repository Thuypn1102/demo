import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    AppRegistry,
    Text
} from 'react-native';

import store from './store'
import AppNavigation from './navigations/AppNavigation'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        )
    }
}

export default App;
