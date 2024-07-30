import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Compress from './components/Compress';
import Imagecompress from './components/Imagecompress';
import Audiocompress from './components/Audiocompress';




export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Audiocompress/>
    </View>
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
