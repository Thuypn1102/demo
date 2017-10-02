import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

import strings from '../../../const/lang';
import toggleLang from '../../../actions/Language'

class SettingList extends Component {
    static navigationOptions = {
        title: 'Setting',
        tabBarLabel: 'Setting',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../img/icon/setting.png')}
                style={{ tintColor: tintColor, width: 26, height: 26 }}
            />
        )
    }

    signOut() {
        AsyncStorage.removeItem('token', (err) => console.log('finished', err));
        this.props.navigation.navigate('Login')
    }
    toggleLang() {
        //Check toogle language to Re render Tasklist and Productlist
        this.props.toggleLang()
        const lang = AsyncStorage.getItem('lang')
        lang.then((resLang) => {
            if (resLang == 'en') {
                AsyncStorage.setItem('lang', 'vi');
                strings.setLanguage('vi');
                this.setState({});
            } else {
                AsyncStorage.setItem('lang', 'en');
                strings.setLanguage('en');
                this.setState({});
            }
        })


    }
    showStore() {
        const lang = AsyncStorage.getItem('lang')
        console.log(lang)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatar}
                            source={require('../../../img/icon.png')}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.infoName} >
                                Dũng Nguyễn
                            </Text>
                            <Text style={styles.infoName} >
                                Phone Number: xxx
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                    <View style={styles.settingRow}>
                        <Text >
                            {strings.language}
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.toggleLang()}
                            style={styles.langContainer}
                        >
                            <Text style={styles.langTxt}>
                                {strings.lang}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title='Sign Out'
                        onPress={this.signOut.bind(this)}
                    />
                </View>
            </View >
        )
    }
}

const styles = {
    container: {
        paddingTop: 22,
        flex: 1,
        backgroundColor: '#fafafa'
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        width: 160,
        height: 160
    },
    avatar: {
        width: 160,
        height: 160,
        borderRadius: 80
    },
    infoContainer: {
        paddingTop: 12
    },
    infoName: {
        fontWeight: '500',
        fontSize: 18
    },

    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 0.5,
        borderColor: '#ddd',
        backgroundColor: '#fdfdfd',
        marginTop: 10
    },
    picker: {
    },
    langContainer: {

    },
    langTxt: {
        fontWeight: '500',
        color: 'red'
    },
}

export default connect(state => ({ lang: state.lang }), { toggleLang })(SettingList)