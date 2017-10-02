import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    FlatList,
    Image,
    Button,
    TextInput
} from 'react-native';

import { connect } from 'react-redux';
import ModalPicker from 'react-native-modal-picker'
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

import { API_TASKLIST } from '../../../api/listApi';
import fetchData from '../../../api/fetchData';
import ButtonM from '../../../components/Button';
import checkLang from '../../../common/checkLang'
import strings from '../../../const/lang'

class TaskList extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: 'Tasks',
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../img/icon/task.png')}
                style={{ tintColor: tintColor, width: 26, height: 26 }}
            />
        )
    })
    constructor(props) {
        super(props);
        let today = new Date;
        this.state = {
            opp: 'CoppMart',
            data: [],
            endDate: Moment(today).format('YYYY-MM-DD'),
            startDate: Moment(today).subtract(1, "days").format('YYYY-MM-DD')
        }
    }
    componentWillMount() {
        this.fetchTask()
    }

    fetchTask() {
        const response = AsyncStorage.getItem('token')
        response.then((token) => {
            const responseTaskList = fetchData(API_TASKLIST, {
                token: token,
                pageLimit: 10,
                currentPage: 1,
                orderBy: {
                    createdAt: 1
                },
                searchInput: "",
                endDate: this.state.endDate + "T16:59:59.999Z",
                startDate: this.state.startDate + "T16:59:59.999Z"
            })
            responseTaskList.then((res) => {
                if (res) {
                    this.setState({
                        data: res.data
                    })
                } else {
                    console.log(responseTaskList)

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
        return (
            <View style={styles.rowHeaderContainer}>
                <View style={styles.rowItem}>
                    <Text style={styles.txtHeader}>
                        {strings.assignee}
                    </Text>
                </View>
                <View style={styles.rowItem}>
                    <Text style={styles.txtHeader}>
                        {strings.task_detail}
                    </Text>
                </View>
                <View style={styles.rowItem}>
                    <Text style={styles.txtHeader}>
                        {strings.status}
                    </Text>
                </View>
            </View>
        )
    }
    changeDate(dnumber) {
        let tDate = this.state.endDate;
        let endDate = Moment(tDate).add(dnumber, 'days').format('YYYY-MM-DD')
        let startDate = Moment(endDate).subtract(1, 'days').format('YYYY-MM-DD')
        this.setState({
            endDate,
            startDate
        })
        this.fetchTask();
        console.log(this.state.endDate)
    }
    setToday() {
        let today = new Date;
        this.setState({
            endDate: Moment(today).format('YYYY-MM-DD'),
            startDate: Moment(today).subtract(1, "days").format('YYYY-MM-DD')
        })
        this.fetchTask();
    }

    listRow = ({ item }) => {
        const STATUS = [
            'Open',
            'Progressing',
            'Completed',
            'Rejected',
            'Deleted'
        ]
        return (
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => this.props.navigation.navigate('TaskDetail', { item })}
            >
                <View style={styles.rowItem}>
                    <Text>{item.assignedTo[0].displayName}</Text>
                </View>
                <View style={styles.rowItem}>
                    <Text>{item.subject}</Text>
                </View>
                <View style={styles.rowItem}>
                    <Text>{STATUS[item.status]}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    keyExtractor = (item) => item._id
    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries' },
            { key: index++, label: 'Pink Grapefruit' },
            { key: index++, label: 'Raspberries' },
            { key: index++, section: true, label: 'Vegetables' },
            { key: index++, label: 'Beets' },
            { key: index++, label: 'Red Peppers' },
            { key: index++, label: 'Radishes' },
            { key: index++, label: 'Radicchio' },
            { key: index++, label: 'Red Onions' },
            { key: index++, label: 'Red Potatoes' },
            { key: index++, label: 'Rhubarb' },
            { key: index++, label: 'Tomatoes' }
        ];
        return (
            <View style={styles.container}>
                <View style={styles.datePickerContainer}>
                    <ButtonM
                        onPress={() => this.changeDate(-1)}
                        icon={require('../../../img/icon/left.png')}
                    />
                    <DatePicker
                        style={{
                            alignItems: 'center',
                            borderColor: 'red'
                        }}
                        date={this.state.endDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                height: 22,
                                left: 0,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderWidth: 0,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }}
                        onDateChange={(date) => {
                            this.setState({ endDate: date })
                            this.fetchTask()
                        }}
                    />
                    <Button
                        title='Today'
                        onPress={this.setToday.bind(this)}
                    />
                    <ButtonM
                        onPress={() => this.changeDate(1)}
                        icon={require('../../../img/icon/right.png')}
                    />
                </View>
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
        flex: 1,
        paddingTop: 22
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

export default connect(state => ({ lang: state.lang.toogleLang }))(TaskList);