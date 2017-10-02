import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Moment from 'moment'
class DatePickerHead extends Component {
    constructor(props) {
        super(props);
        let today = new Date;
        this.state = {
            date: Moment(today).format('YYYY-MM-DD'),
            bDate: Moment(today).subtract(1, "days").format('YYYY-MM-DD')
        }
    }

    render() {
        return (
            <View >
                <DatePicker
                    style={{ width: 150, height: 30 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2019-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            height: 26,
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
            </View>
        )
    }
}

export default DatePicker;