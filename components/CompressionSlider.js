import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Button from './Button';

const CompressionSlider = ({ onSave }) => {
  const [compressionValue, setCompressionValue] = useState(50);

  const handleSave = () => {
    onSave(compressionValue);
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.label}>Compression Quality: {compressionValue}%</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={compressionValue}
        onValueChange={setCompressionValue}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#8C8C8C"
        thumbTintColor="#1EB1FC"
      />
    </View>
    <Button onPress={handleSave} text="Compress" color="magenta"/> 
   </> 
  );
};

const styles = StyleSheet.create({ 
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default CompressionSlider;
