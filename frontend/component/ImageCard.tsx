import { View, Text,StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { getImageSize, wp } from './Common';

const ImageCard = ({item,index,columns}) => {

    const getImageHeight =()=>{

        const {imageHeight: height, imageWidth: width} = item;
        return {height: getImageSize(height,width)}
    }

    const isLastRow=()=>{
        return (index+1) % columns === 0;
    }
  return (
   <Pressable style={[styles.imageWrapper, !isLastRow() && styles.spacing]}>
      <Image
        style={[styles.image, getImageHeight()]}
        source={item?.webformatURL}
        transition={100}
      />
    {/* <Image style={styles.image} source={{uri:item?.webformatURL}}/> */}
   </Pressable>
  )
}
const styles = StyleSheet.create({
    image:{
       height:300,
       width:'100%',
      
    
    },
    imageWrapper:{
        borderRadius:20,
        borderCurve:"continuous",
        marginBottom:wp(2),
        overflow:'hidden'
    },
    spacing:{
       marginRight:wp(2)
    }
})

export default ImageCard