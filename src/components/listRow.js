import React, { Component } from 'react';
import { View, Text } from 'react-native';

const listRow = ({ item }) => {
    return (
        <View style={styles.rowContainer}>
            <View style={styles.rowItem}>
                <Text>{item.assign}</Text>
            </View>
            <View style={styles.rowItem}>
                <Text>{item.task}</Text>
            </View>
            <View style={styles.rowItem}>
                <Text>{item.status}</Text>
            </View>
        </View>
    )
}

const styles = {
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'blue'
    },
    rowItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        backgroundColor: 'green'
    }
}

export { listRow };
