import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer} from "@react-navigation/native"
import { Routes } from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Routes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
