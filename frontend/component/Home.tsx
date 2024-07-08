import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => navigation.navigate("ButtonSearch")}>
        Home
      </Text>

      <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
        Login
      </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  
});

export default Home;
