import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    AsyncStorage,
    KeyboardAvoidingView
} from 'react-native';
import strings from '../../const/lang'

import { API_SIGNIN } from '../../api/listApi';
import fetchData from '../../api/fetchData';
import saveToken from '../../api/saveToken';

export default class Login extends Component {
    state = {
        userName: 'dungnguyen',
        passWord: '12345678',
        status: ''
    }
    _signIn() {
        const { navigate } = this.props.navigation;
        const { userName, passWord } = this.state;
        let response = fetchData(API_SIGNIN, {
            username: userName,
            password: passWord
        });
        response.then((responseJson) => {
            if (responseJson) {
                if (responseJson.token !== undefined) {
                    saveToken(responseJson.token)
                    navigate('Main');
                    this.setState({
                        userName: '',
                        passWord: ''
                    })
                } else {
                    console.log(responseJson.message);
                    this.setState({
                        status: responseJson.message
                    })
                }
            }
        }
        )
            .catch((e) => {
                console.log(e)
            })
    }

    componentWillMount() {
        let token = AsyncStorage.getItem('token')
        token.then((res) => {
            res ? this.props.navigation.navigate('Main') : null
        })

        let lang = AsyncStorage.getItem('lang')
        lang.then((resLang) => {
            strings.setLanguage(resLang);
            this.setState({});
        })
    }
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
            >
                <View>
                    <Image
                        source={require('../../img/icon.png')}
                        style={styles.logoImg}
                    />
                </View>
                <Text>{this.state.status}</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Username'
                    onChangeText={(userName) => this.setState({ userName })}
                    value={this.state.userName}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(passWord) => this.setState({ passWord })}
                    value={this.state.passWord}
                />
                <Button
                    title='Sign In'
                    onPress={this._signIn.bind(this)}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImg: {
        width: 200,
        height: 200
    },
    logo: {
        fontSize: 22,
        fontWeight: '500',
        color: 'blue',
        marginBottom: 15
    },
    textInput: {
        height: 40,
        width: 300,
        borderColor: '#444',
        borderWidth: 0.5,
        paddingTop: 5,
        marginTop: 5
    }
}