import { View, Text, StyleSheet, Alert, TouchableOpacity, TouchableHighlightBase } from 'react-native'
import React, { FormEvent, useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableHighlight, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { API_URL } from '../../API/APi'
import axios from 'axios'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Signup: React.FC = () => {
  const navigation = useNavigation();
  
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  
    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{

        if(!username.trim() || !email.trim() || !password.trim()){
            Alert.alert("Error", "All fields are required.");
            return;
          }

        try{
            const response = await axios.post(`${API_URL}/user/signup`,{
                username,
                email,
                password,
            })
            // console.log(response.data);
            setUsername('');
            setEmail('');
            setPassword('');
            navigation.navigate("ButtonSearch")
            Alert.alert("Success","Account created successfully!")
            const token = response.data.token
            await AsyncStorage.setItem('token', token);
            console.log(token)
           
        }catch(error){
            console.log("Error", error);
            Alert.alert("Error", "Something went wrong!");
        }

    }
  


  return (
    <ScrollView>
    <View style={styles.container}>

<Image style={styles.image} source={{ uri:"https://cdni.iconscout.com/illustration/premium/thumb/online-registration-7964197-6381807.png"}} />
     
    <TextInput
     style={styles.input}
      placeholder='name'
      value={username}
      onChangeText={text=>setUsername(text)}

    />  
  
     <TextInput
     style={styles.input}
      placeholder='email'
      value={email}
      onChangeText={text=>setEmail(text)}
    />
     <TextInput
     style={styles.input}
      placeholder='password'
      value={password}
      onChangeText={text=>setPassword(text)}
    />
    <TouchableHighlight   >
      <Text  onPress={handleSubmit} style={styles.button} >Signup</Text>
    </TouchableHighlight>
    <View>
    <Text style={styles.footerText}>Already have an account?  <Text onPress={()=>navigation.navigate("Login")} style={{color:"black",fontSize:20, fontWeight:"bold"}}>Login</Text></Text>
    </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    flex:1,
    justifyContent:"center",
    marginTop:70,
  },
  input:{
        borderColor:"gray",
        borderBottomWidth:2,
        padding:10,
        margin:10,
        fontSize:20,
        
  },
  button:{
    textAlign:"center",
    backgroundColor:"black",
    margin:10,
    padding:10,
    color:"white",
    fontSize:18,
    fontWeight:"bold",
    transform:[{scale:0.9}],
    borderRadius:10,
  },
  
  footerText:{
    fontSize:18,
    textAlign:"center",
    marginTop:20,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
    
  },
})

export default Signup