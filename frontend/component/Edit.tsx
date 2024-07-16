import { View, Text, TextInput, StyleSheet, TouchableHighlight, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../API/APi';

const Edit = () => {
   const [profileUserName, setProfileUserName] = useState('');
   const [bio, setBio] = useState('');

   const handleSubmit = async () => {
       if ( !bio.trim()) {
           Alert.alert("Error", "All fields are required.");
           return;
       }
       try {
           const response = await axios.post(`${API_URL}/bio/edit`, {
               profileUserName,
               bio,
           });
           console.log(response.data);
           Alert.alert("Success", "Updated Successfully!");
           setProfileUserName('');
           setBio('');
       } catch (error) {
           console.log(error);
           Alert.alert("Error", "Something went wrong. Please try again.");
       }
   };

   return (
       <View style={styles.container}>
           <ImageBackground 
               style={styles.image} 
               source={{ uri: "https://static.thenounproject.com/png/736677-200.png" }} 
           />
           <TextInput 
               placeholder='Edit your name' 
               style={styles.input} 
               value={profileUserName}
               onChangeText={text => setProfileUserName(text)}
           />
           <TextInput 
               placeholder='Edit Your Profile' 
               style={styles.textarea} 
               multiline 
               value={bio}
               onChangeText={text => setBio(text)}
           />
           <TouchableHighlight 
               style={styles.touchable} 
               underlayColor="#DDDDDD" 
               onPress={handleSubmit}
           >
               <Text style={styles.btn}>Edit</Text>
           </TouchableHighlight>
       </View>
   );
};

const styles = StyleSheet.create({
   container: {
       padding: 30,
       flex: 1,
       justifyContent: "center",
   },
   textarea: {
       borderColor: 'black',
       borderWidth: 2,
       marginVertical: 10,
       fontSize: 20,
       maxWidth: 390,
       height: 100,
       textAlignVertical: 'top',
       backgroundColor: 'white',
       padding: 10,
       borderRadius: 5,
   },
   btn: {
       fontSize: 20,
       backgroundColor: "black",
       color: "white",
       padding: 10,
       textAlign: "center",
       borderRadius: 10,
       fontWeight: "bold",
   },
   input: {
       borderColor: 'black',
       borderWidth: 2,
       padding: 10,
       fontSize: 20,
       borderRadius: 5,
   },
   image: {
       width: 200,
       height: 200,
       justifyContent: "center",
       alignSelf: 'center', 
       marginBottom: 40, 
   },
   touchable: {
       borderRadius: 10,
   },
});

export default Edit;
