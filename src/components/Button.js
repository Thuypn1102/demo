import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ButtonM = ({ onPress, icon }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={icon}
                style={{ width: 22, height: 22 }}
            />
        </TouchableOpacity>
    )
}

export default ButtonM;
