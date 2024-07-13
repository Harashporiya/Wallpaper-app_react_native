import { View, StyleSheet, Pressable, Text } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { getImageSize, wp } from './Common';
import { useNavigation } from '@react-navigation/native';


const ImageCard = ({ item, index, columns }) => {
  const navigation = useNavigation();

  const getImageHeight = () => {
    const { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };

  const isLastRow = () => {
    return (index + 1) % columns === 0;
  };

  return (
    <Pressable
      style={[styles.imageWrapper, !isLastRow() && styles.spacing]}
      onPress={() => navigation.navigate('ImageDetails', { imageUrl: item.webformatURL, imageLikes: item.likes,imageViews: item.views,imageDownloads: item.downloads })}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={{ uri: item.webformatURL }}
        transition={100}
      />
     
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
  imageWrapper: {
    borderRadius: 20,
    marginBottom: wp(2),
    overflow: 'hidden',
  },
  spacing: {
    marginRight: wp(2),
  },

});

export default ImageCard;
