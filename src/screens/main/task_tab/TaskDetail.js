import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native';

import { API_TASK_READ } from '../../../api/listApi';
import fetchData from '../../../api/fetchData';
import Moment from 'moment';
import strings from '../../../const/lang'

class TaskDetail extends Component {
    static navigationOptions = {
        title: 'Task detail',
        tabBarLabel: 'Tasks',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../img/icon/task.png')}
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
                dueDate: "",
                startAt: "",
                status: 2,
                subject: "",
                assignedTo: [
                    {
                        _id: "",
                        displayName: "",
                        phoneNumber: null
                    }
                ],
                productId: [
                    {
                        _id: "",
                        productName: "",
                        productCode: "",
                        sku: ""
                    }
                ]
            }
        }
    }

    getNavigationParams() {
        return this.props.navigation.state.params || {}
    }
    componentWillMount() {
        item = this.getNavigationParams().item;
        this.fetchTaskDetail()
        console.log(item._id)
    }
    componentDidMount() {
        console.log('componentDidMount', item._id)

    }
    fetchTaskDetail() {
        console.log('fetchTaskDetail')
        const response = AsyncStorage.getItem('token')
        response.then((token) => {
            const responseTaskDetail = fetchData(API_TASK_READ, {
                token: token,
                pageLimit: 10,
                currentPage: 1,
                orderBy: {
                    createdAt: 1
                },
                searchInput: "",
                taskId: item._id
            })
            responseTaskDetail.then((res) => {
                if (res) {
                    console.log('responseTaskDetail', res)
                    this.setState({
                        data: res.data
                    })
                } else {
                    console.log(responseTaskDetail)
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
        const STATUS = [
            'Open',
            'Progressing',
            'Completed',
            'Rejected',
            'Deleted'
        ]

        return (
            < View style={styles.container} >
                <View style={styles.mainContainer}>
                    <Text style={styles.mainTxt}>Contact:</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={this.descriptionTxt}>Name:{this.state.data.assignedTo[0].displayName}</Text>
                    <Text style={this.descriptionTxt}> PhoneNo:{this.state.data.assignedTo[0].phoneNumber}</Text>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.mainTxt}>
                        Product:
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={this.descriptionTxt} >
                        Name:{this.state.data.productId[0].productName}
                    </Text>
                    <Text>
                        Code:{this.state.data.productId[0].productCode}
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.mainTxt}>Status:</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={this.descriptionTxt}>Due date:{this.state.data.dueDate}</Text>
                    <Text style={this.descriptionTxt}>Status:{STATUS[item.status]}</Text>
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

export default TaskDetail;