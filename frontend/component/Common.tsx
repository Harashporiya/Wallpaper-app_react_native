import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'


const {width:deviceWidth, height:deviceHeight} = Dimensions.get('window')


export const wp = percentage =>{
    const width = deviceWidth;
    return (percentage*width)/100;
}

export const hp = percentage =>{
    const height = deviceHeight;
    return (percentage*height)/100;
}



export const getColumnCount= ()=>{
    if(deviceWidth>=1024){
        // desktop
        return 4
    } else if(deviceWidth>=768){
        // tablet
        return 3
    }else{
        // phone
        return 2
    }

}

export const getImageSize = (height, width)=>{
    if(width>height){
        return 250
    }
    else if(width<height){
        return 300
    }else{
        return 200
    }
}