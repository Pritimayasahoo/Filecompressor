import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native'
import React, {useState,useEffect} from 'react'
//import { Audio } from 'react-native-compressor'
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';

const Audiocompress = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUri, setAudioUri] = useState('');

  const pickAudioFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    });
    
    if (!result.canceled) {
      console.log(result.assets[0].uri)
      setAudioUri(result.assets[0].uri);
    }
  };

  const playPauseSound = async () => {
    if (sound === null && audioUri) {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    } else if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
    
    
  return (
    <View style={styles.container}>
    {audioUri ? (
      <View style={styles.playerContainer}>
        {isPlaying?(
          <Pressable onPress={playPauseSound}>
          <Image
          source={require('../assetes/play64.png')} // Replace with your logo URL
          style={styles.logo}
         />
        </Pressable>):(
        <Pressable onPress={playPauseSound}>
          <Image
          source={require('../assetes/pause64.png')} // Replace with your logo URL
          style={styles.logo}
         />
        </Pressable>)}
        <Button title={isPlaying ? "Pause" : "Play"} onPress={playPauseSound} />
      </View>
    ) : null}
    <Button title="Pick Audio File" onPress={pickAudioFile} />
  </View>
  )
}

export default Audiocompress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
})