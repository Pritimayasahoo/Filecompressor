
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ToastAndroid, Text,} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import {Video} from 'react-native-compressor';
import RNFS from 'react-native-fs';

import CompressionSlider from './CompressionSlider';
import Loadingspinner from './Loadingspinner';
import Button from './Button';
import Reactnativevideo from './Reactnativevideo';

import {getOriginalBitrate, calculateTargetBitrate} from '../helper/Videobitrate'


const Compress = () => {
    const [videoUri, setVideoUri] = useState(null);
    const [compressedUri, setCompressedUri] = useState(null);
    const [spinner,setspinner] = useState(false)
    const [videoloading,setvideoloading] = useState(false)
    
    //select a video
    const pickVideo = async () => {
      setVideoUri(null)
      setvideoloading(true)
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });
      if (!result.canceled) {
        setVideoUri(result.assets[0].uri);
      }
      setvideoloading(false)
    };


    //compress video
    const compressVideo = async (compressionPercentage) => {
      setspinner(true)
      const originalBitrate=await getOriginalBitrate(videoUri)
      const targetBitrate = calculateTargetBitrate(originalBitrate, compressionPercentage);
      try{

        const compressedUri = await Video.compress(
          videoUri,
          {
            compressionMethod: 'manual',
            bitrate:targetBitrate  
          }
        );
        setCompressedUri(compressedUri);
      }
      catch(error)
      { 
        Alert.alert('Something went wrong', `video can't be compress`)
      }
      setVideoUri(null)
      setspinner(false)
    };


    //save compress video
    const saveCompressedVideo = async () => {
      const fileName = `compressed_video_${Date.now()}.mp4`;
      const downloadPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`;
      try {
        await RNFS.copyFile(compressedUri, downloadPath);
        RNFS.scanFile(downloadPath).then(() => {
          ToastAndroid.show('Video saved to gallery!', ToastAndroid.SHORT);
        });
      } catch (error) {
        Alert.alert('something wrong','unabel to save video');
      }
      setCompressedUri(null)
    }
  
    //cancel saving
    const cancel= ()=>{
      setCompressedUri(null)
    }

    
    //loading state
    if (spinner)
    {
      return <Loadingspinner text="compressing..."/>
    }
    
    //show compress video
    if (compressedUri)
    {
      return (<View>
        <Reactnativevideo uri={compressedUri}/>  
        <Button onPress={saveCompressedVideo} text="Save" color="green"/>
        <Button onPress={cancel} text="cancel" color="red"/>
      </View>)
    }

    return (
      <>
      <View >
         {videoUri ? (
            <View>
              <Reactnativevideo uri={videoUri}/>
            <CompressionSlider onSave={compressVideo}/>
            </View>
          ) :(videoloading?(<Loadingspinner text="loading..."/>):
              (<View style={styles.textcontainer}>
              <Text style={styles.placeholderText}>No video yet</Text>
              </View>)
            )
         }
        <Button onPress={pickVideo} text="Pick a video" color="blue"/>   
    </View>    
        
      </>
    );
}



export default Compress

const styles = StyleSheet.create({
      textcontainer:{
        alignItems:"center"
      },
      placeholderText:{
        fontSize:18,
        fontWeight:'bold',
      }
})






