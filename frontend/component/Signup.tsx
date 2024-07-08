import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableHighlight, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { API_URL } from '../../../API/APi'
import axios from 'axios'

const Signup = () => {
  const navigation = useNavigation();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
    const handleSubmit = async()=>{

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
    <TouchableHighlight onPress={handleSubmit} >
      <Text style={styles.button} >Signup</Text>
    </TouchableHighlight>
    <View>
    <Text style={styles.footerText}>Already have an account?  <Text onPress={()=>navigation.navigate("Login")} style={{color:"black",fontSize:20}}>Login</Text></Text>
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