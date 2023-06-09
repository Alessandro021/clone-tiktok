import { useState, useRef } from 'react';
import { StyleSheet,View} from 'react-native';
import Slider from '@react-native-community/slider';

export default function VideoProgressBar({ videoRef, duration, position }){
    const [sliderValue, setSliderValue] = useState(0);
  
    const handleSlidingComplete = async (value) => {
      await videoRef.current.setPositionAsync(value);
    };

    async function handleSliderChange(value){
      
       videoRef.current?.playAsync()
      setSliderValue(value)
    }
  
    return (
      <View style={styles.container}>
        <Slider
          style={styles.sliderContainer}
          value={position}
          maximumValue={duration}
          onValueChange={(value) => handleSliderChange(value)}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#1EB1FC"
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 25, 
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center", 
      alignContent: "center", 
      zIndex: 99, 
      bottom: 20,
    },
    sliderContainer: { 
      width: '90%',
      height: 25, 
     }
  })