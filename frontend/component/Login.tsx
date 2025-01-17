import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { FormEvent, useState } from 'react';
import { TextInput } from 'react-native';
import { TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../../API/APi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login: React.FC = () => {
  
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handelSubmit = async(e:FormEvent<HTMLFormElement>)=>{
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
    const token = response.data.token
    await AsyncStorage.setItem('token', token);
    console.log(token)
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
      <TouchableHighlight >
        <Text  onPress={handelSubmit} style={styles.button}>Login</Text>
      </TouchableHighlight>
      <View>
        <Text style={styles.footerText}>Don't have an account? <Text onPress={() => navigation.navigate("Signup")} style={{ color: "black", fontSize: 20, fontWeight:"bold" }}>SignUp</Text></Text>
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
    borderRadius:10,
    transform:[{scale:0.9}]
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
