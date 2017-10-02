import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';

const Icon = ({ icon }) => {
    return (
        <View>
            <Image
                source={icon}
                style={{ width: 22, height: 22 }}
            />
        </View>
    )
}

export default Icon;
