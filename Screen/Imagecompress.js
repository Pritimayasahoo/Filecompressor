import { StyleSheet, Text, View, ToastAndroid, Image as Img } from 'react-native'
import React, {useState} from 'react'

import * as ImagePicker from 'expo-image-picker';
import {Image} from 'react-native-compressor';
import RNFS from 'react-native-fs';

import CompressionSlider from '../components/CompressionSlider';
import Loadingspinner from '../components/Loadingspinner';
import Button from '../components/Button';



const Imagecompress = () => {
    const [imageUri, setimageuri] = useState(null);
    const [compressedUri, setCompressedUri] = useState(null);
    const [spinner,setspinner] = useState(false)
    const [imageloading,setimageloading] = useState(false)  

  //select a Image
  const pickImage = async () => {
    setimageuri(null)
    setimageloading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setimageuri(result.assets[0].uri);
    }
    setimageloading(false)
  };

//compress image 
    const compressImage = async (compressionPercentage) => {
        setspinner(true)
        const quality=1-(compressionPercentage/100)
        try{
  
          const compressedUri = await Image.compress(
            imageUri,
            {
              compressionMethod: 'manual',
              quality: quality, 
            }
          );
          setCompressedUri(compressedUri);
        }
        catch(error)
        { 
          Alert.alert('Something went wrong', `video can't be compress`)
        }
        setimageuri(null)
        setspinner(false)
      };


      //save compress image
      const saveCompressedImage = async () => {
        const fileName = `compressed_image_${Date.now()}.jpg`;
        const downloadPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`;
        try {
          await RNFS.copyFile(compressedUri, downloadPath);
          RNFS.scanFile(downloadPath).then(() => {
            ToastAndroid.show('image saved to gallery!', ToastAndroid.SHORT);
          });
        } catch (error) {
          Alert.alert('something wrong','unabel to save image');
        }
        setCompressedUri(null)
      }
    
      //cancel saving
      const cancel= ()=>{
        setCompressedUri(null)
      }
   

     //loading state
     if (spinner)
      { //navigation.navigate('Video')
        return (
          <View style={styles.container}>
          <Loadingspinner text="loading..."/>
         </View>
        )
      }   

      
   //show compress video
   if (compressedUri)
    {
      return (<View style={styles.container}>
        <Img style={styles.image}
        source={{
          uri: compressedUri,
        }}/>
        <Button onPress={saveCompressedImage} text="Save" color="green"/>
        <Button onPress={cancel} text="cancel" color="red"/>
      </View>)
    }

  return (
    <View style={styles.container}>
    {imageUri? <><Img
        style={styles.image}
        source={{
          uri: imageUri,
        }}/>
        <View>
        <CompressionSlider onSave={compressImage}/>
        </View>
        </>
        :imageloading?(<Loadingspinner text="loading..."/>):(<Text style={styles.placeholdertext}>No image yet</Text>)}
    <Button onPress={pickImage} text="Pick Image" color="blue"/>
    </View> 
      
  )
}

export default Imagecompress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
    image:{
        width:300,
        height:200,
        borderRadius:7
    },
    placeholdertext:{
      fontSize:18,
      fontWeight:'bold',
      color:"grey"
    }
})