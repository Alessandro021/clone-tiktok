import { View, StyleSheet, Text } from "react-native";

export default function New(){
    return (
        <View style={styles.container}>
            <Text>new</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})