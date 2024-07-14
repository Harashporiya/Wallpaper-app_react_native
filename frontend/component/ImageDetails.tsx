import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';
import Icon from 'react-native-vector-icons/FontAwesome';


const ImageDetails = ({ route }) => {
  const { imageUrl, imageLikes,imageViews, imageDownloads } = route.params;

  const downloadsImage = async () => {
   try{
    const {status} = await MediaLibrary.requestPermissionsAsync();
    if(status !== 'granted'){
       return ;
    }

    const fileUri = FileSystem.documentDirectory + imageUrl.split('/').pop();
    const downloadedFile = await FileSystem.downloadAsync(imageUrl, fileUri);

    await MediaLibrary.createAssetAsync(downloadedFile.uri);
    Alert.alert('Download Success', 'Image has been downloaded to your gallery');

   }catch(error){
    Alert.alert("Error", "Image is not downloades to your gallery")
   }


  }
  
  return (
    <>
    <View style={styles.container}>
            
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.iconcontainer}>
        <Text style={styles.likes}>  <Icon  name="thumbs-up" size={30} color="#000" />{imageLikes}</Text>
      
        <Text style={styles.likes}><Icon   name="eye" size={30} color="#000" /> {imageViews}</Text>
      
        <Text style={styles.likes}><Icon   name="download" size={30} color="#000" /> {imageDownloads}</Text>
      </View>

      <View>
    <TouchableHighlight>
      <Text onPress={downloadsImage} style={styles.btn}>Download Image</Text>
    </TouchableHighlight>
  </View>
    </View>
   
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    minHeight: 500,
    width: '95%',
    borderRadius: 10,
    
  },
  likes: {
    fontSize: 20,
  },
  iconcontainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    width:'100%',
    marginTop:10,
  },
  btn:{
  marginTop:20,
  fontSize:18,
  backgroundColor:"black",
  padding:10,
  borderRadius:10,
  color:"white",
  fontWeight:"bold",
  }
});

export default ImageDetails;
