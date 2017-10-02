import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    FlatList,
    Image,
    Button,
} from 'react-native';
import { connect } from 'react-redux';

import { API_PRODUCT_LIST } from '../../../api/listApi';
import fetchData from '../../../api/fetchData';
import ButtonM from '../../../components/Button';
import strings from '../../../const/lang';

class ProductList extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: 'Products',
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../img/icon/product.png')}
                style={{ tintColor: tintColor, width: 26, height: 26 }}
            />
        )
    })
    constructor(props) {
        super(props);
        this.state = {
            opp: 'CoppMart',
            data: [],
            language: 'js'
        }

    }
    componentWillMount() {
        this.fetchProduct()
    }

    checkLang() {
        const lang = AsyncStorage.getItem('lang')
        lang.then((resLang) => {
        })
    }
    fetchProduct() {
        const response = AsyncStorage.getItem('token')
        response.then((token) => {
            const responseProductList = fetchData(API_PRODUCT_LIST, {
                token: token,
                pageLimit: 10,
                currentPage: 1,
                orderBy: {
                    createdAt: 1
                },
                searchInput: ""
            })
            responseProductList.then((res) => {
                if (res) {
                    this.setState({
                        data: res.data
                    })
                } else {
                    console.log(responseProductList)
                }
            }
            )
                .catch((e) => {
                    console.log(e)
                })
        }
        )
    }

    listHeader() {
        this.checkLang()
        return (
            <View style={styles.rowHeaderContainer}>
                <View style={styles.rowItem}>
                    <Text style={styles.txtHeader}>
                        {strings.category}
                    </Text>
                </View>
                <View style={styles.rowItem}>
                    <Text style={styles.txtHeader}>
                        {strings.product}
                    </Text>
                </View>
                <View style={styles.rowItem}>
                    <Text style={styles.txtHeader}>
                        {strings.action}
                    </Text>
                </View>
            </View>
        )
    }

    listRow = ({ item }) => {

        return (
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => this.props.navigation.navigate('ProductDetail', { item })}
            >
                <View style={styles.rowItem}>
                    <Text>{item.categoryIds[0]}</Text>
                </View>
                <View style={styles.rowItem}>
                    <Text>{item.productName}</Text>
                </View>
                <View style={styles.rowItem}>
                    <Image
                        source={require('../../../img/icon/cart.png')}
                        style={{ width: 50, height: 35 }}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    keyExtractor = (item) => item._id
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.showPicker()}
                    style={styles.oppContainer}
                >
                    <Text style={styles.oppTxt}>{this.state.opp}</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.data}
                    ListHeaderComponent={this.listHeader.bind(this)}
                    renderItem={this.listRow.bind(this)}
                    keyExtractor={this.keyExtractor}
                />
            </View >
        )
    }
}

const styles = {
    container: {
        paddingTop: 22,
        flex: 1
    },
    picker: {
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#ddd',
        backgroundColor: '#fefefe',
        padding: 12,
        marginTop: 1.5
    },
    rowHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#ddd',
        backgroundColor: '#fdfdfd',
        padding: 12,
        marginTop: 10
    },
    rowItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtHeader: {
        fontWeight: '500',
        color: 'blue'
    },
    oppContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        height: 40,
    },
    oppTxt: {
        fontWeight: '500',
        fontSize: 18,
        color: 'red'
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        height: 40
    }
}

export default connect(state => ({ lang: state.lang.toogleLang }))(ProductList);