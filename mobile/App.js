import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './shared/Header';
import Main from './navigation/Main';
import Toast from 'react-native-toast-message';

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
        <StatusBar style="dark" />
          <View style={styles.container}>
            {/* <Header style={styles.headerContainer} /> */}
            
            <Main />
            <Toast />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    zIndex: 1000, 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});