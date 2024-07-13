// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Home'; 
// import ButtonSearch from './ButtonSearch'; 
// import Login from './Login';

// const Stack = createNativeStackNavigator();

// const Router = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen 
//           name="Home"
//           component={Home}
//           options={{ title: "Home" }}
//         />
//         <Stack.Screen 
//           name="ButtonSearch"
//           component={ButtonSearch}
//           options={{ title: "Search" }}
//         />

//         <Stack.Screen
//         name='Login'
//         component={Login}
//         options={{title:"Login"}}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default Router;

// import React from 'react';
// import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// import { Image } from 'expo-image';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';

// const ImageDetails = ({ route }) => {
//   const { imageUrl } = route.params;

//   const downloadImage = async () => {
//     try {
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission Denied', 'You need to allow permission to download the image');
//         return;
//       }

//       const fileUri = FileSystem.documentDirectory + imageUrl.split('/').pop();
//       const downloadedFile = await FileSystem.downloadAsync(imageUrl, fileUri);

//       await MediaLibrary.createAssetAsync(downloadedFile.uri);
//       Alert.alert('Download Success', 'Image has been downloaded to your gallery');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Download Failed', 'There was an error downloading the image');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={imageUrl} style={styles.image} />
//       <Button title="Download Image" onPress={downloadImage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '90%',
//     height: '80%',
//     borderRadius: 10,
//   },
// });

// export default ImageDetails;
