import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../../API/APi';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelSubmit = async()=>{
    if(!email.trim() || !password.trim()){
      Alert.alert("Error", "All fields are required.");
      return;
    }

   try{
    const response = await axios.post(`${API_URL}/user/login`,{
      email,
      password,
    })
    // console.log(response.data);
    setEmail('');
    setPassword('');
    navigation.navigate("ButtonSearch")
    Alert.alert("success", "Login Successfully!");
   }catch(error){
    console.log("error", error);
    Alert.alert("Error", "Something went wrong!");
   }
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri:"https://cdni.iconscout.com/illustration/premium/thumb/log-in-security-7230045-5874820.png"}} />
  
      <TextInput
        style={styles.input}
        placeholder='email'
       value={email}
       onChangeText={text=>setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='password'
        secureTextEntry={true}
        value={password}
        onChangeText={text=>setPassword(text)}
      />
      <TouchableHighlight onPress={handelSubmit}>
        <Text style={styles.button}>Login</Text>
      </TouchableHighlight>
      <View>
        <Text style={styles.footerText}>Don't have an account? <Text onPress={() => navigation.navigate("Signup")} style={{ color: "black", fontSize: 20 }}>SignUp</Text></Text>
      </View>
     
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    marginTop:100,
  },
  input: {
    borderColor: "gray",
    borderBottomWidth: 2,
    padding: 10,
    margin: 10,
    fontSize: 20,
  },
  button: {
    textAlign: "center",
    backgroundColor: "black",
    margin: 10,
    padding: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 18,
    textAlign: "center",
    marginTop:20,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
    
  },
});

export default Login;
