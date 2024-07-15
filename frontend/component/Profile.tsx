import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../API/APi'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Profile = () => {

    const [username, setUsername] = useState('');

    const fetchData = async()=>{
       try{
        const token = await AsyncStorage.getItem('token')
        if(!token){
            console.log("No token found");
        return;
        }
          
        console.log("Token found", token);

        const response = await axios.get(`${API_URL}/user/data`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Username", response.data.username);
        setUsername(response.data.username)
       }catch(error){
        console.log("Error")
       }
    }
    useEffect(()=>{ 
        // const interval = setInterval(()=>{
        //     fetchData();
        // },1000)
        // fetchData();
        // return () => clearInterval(interval); 
    },[]);
  return (
    <View>
      <Text>Profile</Text>
      <Text>{username}</Text>
    </View>
  )
}

export default Profile