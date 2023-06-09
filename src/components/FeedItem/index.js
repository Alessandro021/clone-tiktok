import {useRef, useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, TouchableOpacity, Platform} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets} from "react-native-safe-area-context";
import { Video } from 'expo-av';
import { Ionicons } from "@expo/vector-icons"
import VideoProgressBar from '../VideoProgressBar';

export default function FeedItem({data, currentVisibleItem}) {
    const isFocused = useIsFocused();
    const { height: heightScreen, width: widthScreen} = Dimensions.get("screen")
    const { top } = useSafeAreaInsets()
    const videoRef = useRef(null)
    const [status, setStatus] = useState({})

    const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

    useEffect(() => {
        if(currentVisibleItem?.id === data?.id){
            videoRef.current?.playAsync()
        } else {
            videoRef.current?.pauseAsync()
        }

        if (!isFocused) {
            videoRef.current?.pauseAsync()
          }
    },[currentVisibleItem, isFocused])


    function handlePlayer(){
        status.isPlaying ? videoRef.current?.pauseAsync() : videoRef.current?.playAsync()
    }

    const handlePlaybackStatusUpdate = (status) => {

        setStatus(() => status)
        // console.log(status)

        if (status.durationMillis) {
          setDuration(status.durationMillis);
        }
        if (status.positionMillis) {
          setPosition(status.positionMillis);
        }
      };
 return (
   <Pressable onPress={handlePlayer} style={styles.container}>

        <View style={styles.info}>
            <Text style={styles.nome}>{data?.nome}</Text>
            <Text style={styles.description} numberOfLines={2}>{data?.description}</Text>
        </View>

        <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name='heart' size={35} color={"#FFF"} />
                <Text style={styles.actionText}>30k</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name='chatbubble-ellipses' size={35} color={"#FFF"} />
                <Text style={styles.actionText}>235</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name='bookmark' size={35} color={"#FFF"} />
            </TouchableOpacity>
            
        </View>

        <VideoProgressBar videoRef={videoRef} duration={duration} position={position} />
        <Video 
            ref={videoRef}
            style={{width: widthScreen, height: heightScreen - top}}
            source={{uri: data?.video}}
            resizeMode="cover"
            shouldPlay={false}
            isMuted={false}
            isLooping
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
   </Pressable>  
   );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    info: {
        position: "absolute",
        zIndex: 98,
        left: 8,
        padding: 8,
        bottom: 50,
    },
    nome: {
        color: "#FFF",
        fontWeight: "bold",
        marginBottom: 4,
        textShadowColor: "rgba(0,0,0,0.90)",
        textShadowOffset: {width: -1, height: 1.5},
        textShadowRadius: 8,
    },
    description: {
        color: "#FFF",
        marginRight: 14,
        textShadowColor: "rgba(0,0,0,0.30)",
        textShadowOffset: {width: -1, height: 1.5},
        textShadowRadius: 8,
    },
    actions: {
        position: "absolute",
        zIndex: 97,
        right: 10,
        bottom: Platform.OS === "android" ? 120 : 170,
        gap: 15
    },
    actionText: {
       textAlign: "center",
       color: "#FFF",
       textShadowColor: "rgba(0,0,0,0.90)",
       textShadowOffset: {width: -1, height: 1.5},
       textShadowRadius: 8,
       fontWeight: "bold"
    }
})