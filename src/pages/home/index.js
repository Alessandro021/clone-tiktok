import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Dimensions, FlatList } from "react-native";
import { useSafeAreaInsets, SafeAreaView} from "react-native-safe-area-context";


import FeedItem from "../../components/FeedItem";
import { useRef, useState, } from "react";

export default function Home(){
    const { bottom, top } = useSafeAreaInsets()
    const { height: heightScreen, width: widthScreen} = Dimensions.get("screen")

    let feedItems = [
        {
            id: '1',
            video: 'https://i.imgur.com/PAbq3Y1.mp4',
            nome: '@marcos_4587',
            description: 'Homem fugindo de touro e acerta um poste e cai kkkk',
        },
        {
            id: '2',
            video: 'https://i.imgur.com/K7GD5wy.mp4',
            nome: '@henriques23587',
            description: 'A quinta serie não sai do homem.',
        },
        {
            id: '3',
            video: 'https://i.imgur.com/4uCA945.mp4',
            nome: '@maria_mg658',
            description: 'Quando a pessoa diz que trabalha com TI',
        },

        {
            id: '4',
            video: 'https://i.imgur.com/rTFkPMK.mp4',
            nome: '@pedrogM541',
            description: 'Fui enganado...',
        },

        {
            id: '5',
            video: 'https://i.imgur.com/72DaC4C.mp4',
            nome: '@marcela846',
            description: 'Alexa vs assistente virtual do Youtube',
        },

        {
            id: '6',
            video: 'https://i.imgur.com/8e04Cxy.mp4',
            nome: 'lucia52384',
            description: 'armação na aposta...',
        },

        {
            id: '7',
            video: 'https://i.imgur.com/Z3gtTyU.mp4',
            nome: '@joaoGui757',
            description: 'Historia da tribo kkkk',
        },
    ]

    const [showItem, setShowItem] = useState(feedItems[0])
    const onViewRef = useRef(({viewableItems}) => {
        if(viewableItems && viewableItems.length > 0){
            setShowItem(feedItems[viewableItems[0].index])
        }
    })

    return (
        <View style={styles.container}>
            <View style={[styles.labels, {marginTop: top, marginBottom: bottom,}]}>
                <TouchableOpacity>
                    <Text style={[styles.labelText, {color: "#DDD"}]}>Seguindo</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={[styles.labelText, {color: "#FFF"}]}>Pra você</Text>
                    <View style={styles.indicator}></View>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={feedItems}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => <FeedItem data={item} currentVisibleItem={showItem}/>}
                showsVerticalScrollIndicator= {false}
                onViewableItemsChanged={onViewRef.current}
                snapToAlignment="center"
                snapToInterval={heightScreen - top}
                scrollEventThrottle={500}
                decelerationRate={"fast"}
                viewabilityConfig={{
                    waitForInteraction: false,
                    itemVisiblePercentThreshold: 90
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    }, 
    labels: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        position: "absolute",
        top: 6,
        left: 0,
        right: 0,
        zIndex: 99,
    },

    labelText: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 2
    },
    indicator: {
        backgroundColor: "#FFF",
        width: 32,
        height: 1,
        alignSelf: "center"
    }
})