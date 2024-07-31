import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import  Videocompress from './Screen/Videocompress';
import Imagecompress from './Screen/Imagecompress';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screen/Home';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='auto'/>
     <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='Video' component={Videocompress}/>
        <Stack.Screen name='Image' component={Imagecompress}/>
     </Stack.Navigator>
     </NavigationContainer>
     </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
