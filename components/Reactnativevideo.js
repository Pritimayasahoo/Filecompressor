import { StyleSheet, Dimensions } from 'react-native'
import Video from 'react-native-video'
import React from 'react'

const windowWidth = Dimensions.get('window').width;

const Reactnativevideo = ({uri}) => {
  return (
    <Video
      source={{ uri: uri }}
      style={styles.video}
      rate={1.0}
      volume={1.0}
      muted={false}
      resizeMode="cover"
      repeat
      controls
    />
  )
}

export default Reactnativevideo

const styles = StyleSheet.create({
    video: { 
        width: windowWidth-20,
        height: 250,
      },
})