import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home'; 
import ButtonSearch from './component/ButtonSearch'; 
import Login from './component/Login';
import Signup from './component/Signup';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* <Stack.Screen 
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        /> */}
          <Stack.Screen
        name='Signup'
        component={Signup}
        options={{title:"Signup"}}/>
        <Stack.Screen 
          name="ButtonSearch"
          component={ButtonSearch}
          options={{ title: "Pixles" }}
        />

        <Stack.Screen
        name='Login'
        component={Login}
        options={{title:"Login"}}/>

      
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;

