//connect RootNavigation to redux
import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'

import Root from './Root'

class AppNavigation extends Component {
    render() {
        return (
            <Root
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            >

            </Root>
        )
    }
}

export default connect(state => ({ nav: state.nav }))(AppNavigation)