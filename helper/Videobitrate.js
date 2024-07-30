import {getVideoMetaData} from 'react-native-compressor'


function calculateBitrate(fileSizeInBytes, durationInSeconds)
{
    fileSizeInBytes=Math.floor(fileSizeInBytes)
    durationInSeconds=Math.floor(durationInSeconds)
    const fileSizeInBits = fileSizeInBytes * 8;
    return Math.floor(fileSizeInBits / durationInSeconds);
  };
  
export async function getOriginalBitrate(uri){
    try {
      const metaData = await getVideoMetaData(uri);
      const bitrate = calculateBitrate(metaData.size, metaData.duration);
      return bitrate;
    } catch (error) {
      console.error('Error getting video metadata: ', error);
    }
  };

export function calculateTargetBitrate(originalBitrate, compressionPercentage){
    return Math.floor(originalBitrate * ((100 - compressionPercentage) / 100));
  };


