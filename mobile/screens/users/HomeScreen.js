import React from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const handleResidentPress = () => {
    navigation.navigate('Dormitory');
  };

  const handleAdminPress = () => {
    navigation.navigate('Hostel');
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}></Text> */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleResidentPress}>
          <FontAwesome
            name="building" 
            size={120}
            style={styles.icon}
          />
          <Text style={styles.text}>Dormitory</Text>
        </TouchableOpacity>
        <View style={styles.iconGap} />
        <TouchableOpacity onPress={handleAdminPress}>
          <FontAwesome
            name="university" 
            size={120}
            style={styles.icon}
          />
          <Text style={styles.text}>Hostel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffcc'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  iconGap: {
    width: 20, // Adjust the gap width as needed
  },
  text: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
  },
});

export default HomeScreen;