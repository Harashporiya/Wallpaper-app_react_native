import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../API/APi';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Bio{
  id:string;
  bio:string;
}
const Profile = () => {
    const [username, setUsername] = useState('');
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await axios.get(`${API_URL}/user/data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsername(response.data.username);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const bioFetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/bio/add/bio`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching bio data:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
            bioFetchData();
        }, 1000);
        fetchData();
        bioFetchData();
        
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.edit}>
                <View style={styles.circle}>
                    <Image style={styles.image} source={{ uri: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" }} />
                </View>
                <TouchableHighlight onPress={() => navigation.navigate("Edit")} underlayColor="#DDDDDD">
                    <Text style={styles.btn}>Edit</Text>
                </TouchableHighlight>
            </View>
            <Text style={styles.user}>{username}</Text>
            <View style={styles.separator} />
            {
                data.length > 0 ? (
                    data.map((item:Bio) => (
                        <View key={item.id}>
                            <Text style={styles.bio}>{item.bio}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No bio data available</Text>
                )
            }
            <View style={styles.LikeContainer}>
                <View style={styles.separator} />
                <Text style={styles.like}>Your Liked Images</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    edit: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '100%',
        marginVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    user: {
        fontSize: 24,
    },
    like: {
        fontSize: 20,
        color: "black",
    },
    LikeContainer: {
        // flex: 1,
        justifyContent: "center",
    },
    btn: {
        marginTop: 50,
        fontSize: 18,
        backgroundColor: "black",
        color: "white",
        padding: 10,
        borderRadius: 10,
        fontWeight: "bold",
    },
    bio:{
      fontSize:20,
    }
});

export default Profile;
