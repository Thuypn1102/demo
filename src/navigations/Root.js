import { StackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native'
import Login from '../screens/login'
import Main from './Main'

const Root = StackNavigator({
    Login: { screen: Login },
    Main: { screen: Main },
}, {
        navigationOptions: {
            header: null
        }
    })

export default Root;
