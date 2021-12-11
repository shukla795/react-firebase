/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , {useState , useEffect} from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import 'react-native-gesture-handler';
import auth from "@react-native-firebase/auth"

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CreateAdScreen from './screens/CreateAdScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ListItemScreen from './screens/ListItemScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './screens/AccountScreen';

import Feather from "react-native-vector-icons/Feather"

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green'
  },
};

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
const Authnavigator = () => {
  return (
  <Stack.Navigator>
     <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false  }}  />
     <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false  }} />
  </Stack.Navigator>
  )  
}

const Tabnavigator = () =>{
  return (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({  color }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home'
      } else if (route.name === 'create') {
        iconName = 'plus-circle'
      }else{
        iconName = 'user'
      }

      // You can return any component that you like here!
      return <View  ><Feather name={iconName} size={30}  color={color} /></View>;
    },
  })}
  tabBarOptions={{
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  }}
  
  
  >
    <Tab.Screen name="Home" component={ListItemScreen}  options={{title:""}} />
    <Tab.Screen name="create" component={CreateAdScreen} options={{title:""}} />
    <Tab.Screen name="account" component={AccountScreen} options={{title:""}} />
  </Tab.Navigator>
  )
}

const Navigation = () => {
  const [user ,setUser ] = useState('')
   
  useEffect(()=>{
    auth().onAuthStateChanged((userExist)=>{
        if(userExist){
           setUser(userExist)
        }else{
          setUser('')
        }
    })
  },[])


  return(
    <NavigationContainer>
    { user ? <Tabnavigator /> : <Authnavigator /> }
    </NavigationContainer>
  )
}



const App = () => {
  return (
    <>
    <PaperProvider theme={theme} >
      <StatusBar barStyle="dark-content" backgroundColor="deepskyblue" />
        <View style={styles.container} >
         <Navigation />
        </View>
    </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"orange",
    fontSize:30
  }
});

export default App;
