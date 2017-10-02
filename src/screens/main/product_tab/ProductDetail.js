import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native';

import { API_PRODUCT_READ } from '../../../api/listApi';
import fetchData from '../../../api/fetchData';
import Moment from 'moment';
import strings from '../../../const/lang'

class ProductDetail extends Component {
    static navigationOptions = {
        title: 'Product detail',
        tabBarLabel: 'Products',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../img/icon/product.png')}
                style={{ tintColor: tintColor, width: 26, height: 26 }}
            />
        )
    }
    constructor(props) {
        super(props);
        let item = null;
        this.state = {
            data: {
                _id: "",
                productName: "",
                organizationId: {
                    _id: "",
                    organizationName: ""
                },
                categoryIds: [
                    {
                        _id: "",
                        categoryType: "",
                        categoryName: "",
                        categoryCode: ""
                    }
                ],
                createdBy: "",
                productCode: null,
                sku: ""
            }
        }
    }

    getNavigationParams() {
        return this.props.navigation.state.params || {}
    }
    componentWillMount() {
        item = this.getNavigationParams().item;
        this.fetchProductDetail()
    }
    componentDidMount() {

    }
    fetchProductDetail() {
        const response = AsyncStorage.getItem('token')
        response.then((token) => {
            const responseProductDetail = fetchData(API_PRODUCT_READ, {
                productId: item._id,
                token: token
            })
            responseProductDetail.then((res) => {
                if (res) {
                    this.setState({
                        data: res.data
                    })
                } else {
                    console.log(responseProductDetail)
                }
            }
            )
                .catch((e) => {
                    console.log(e)
                })
        }
        )
    }
    render() {
        return (
            < View style={styles.container} >
                <View style={styles.mainContainer}>
                    <Text style={styles.mainTxt}>Info:</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text
                        style={this.descriptionTxt}
                    >
                        Name:{this.state.data.productName}
                    </Text>
                    <Text
                        style={this.descriptionTxt}
                    >
                        Code:{this.state.data.productCode}
                    </Text>
                    <Text
                        style={this.descriptionTxt}
                    >
                        Organization: {this.state.data.organizationId.organizationName}
                    </Text>
                    <Text
                        style={this.descriptionTxt}
                    >
                        Status:
                    </Text>
                </View>
            </View >
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fafafa'
    },
    mainContainer: {
        marginLeft: 5
    },
    mainTxt: {
        fontWeight: '600',
        fontSize: 16
    },
    descriptionContainer: {
        margin: 15,
    },
    descriptionTxt: {
        fontWeight: '300'
    },
}

export default ProductDetail;