import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Management = () => {
  const navigation = useNavigation();

  const ResidentsList = () => {
    navigation.navigate("Residents"); // Navigate to the Residents screen
  };

  const RoomsList = () => {
    navigation.navigate("Rooms"); // Navigate to the Rooms screen
  };
  
  const RepairMansList = () => {
    navigation.navigate("RepairMen"); // Navigate to the Rooms screen
  };

  const AnnouncementsList = () => {
    navigation.navigate("Announcements"); // Navigate to the Rooms screen
  };

  const PaymentsList = () => {
    navigation.navigate("Payments"); // Navigate to the Rooms screen
  };

  const LostAndFoundList = () => {
    navigation.navigate("LostItems"); // Navigate to the Rooms screen
  };

  const LaundryList = () => {
    navigation.navigate("Laundry"); // Navigate to the Rooms screen
  };

  const VisitorsList = () => {
    navigation.navigate("Visitors"); // Navigate to the Rooms screen
  };

  return (
    <View>
      <TouchableOpacity onPress={ResidentsList} style={{ marginVertical: 25, alignItems:"center" }}>
        <Text>Residents</Text>
      </TouchableOpacity>
      
      {/* Horizontal line to divide navigation options */}
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}} />

      <TouchableOpacity onPress={RoomsList} style={{ marginVertical: 25, alignItems:"center" }}>
        <Text>Rooms</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}} />
      <TouchableOpacity onPress={RepairMansList} style={{ marginVertical: 25, alignItems:"center" }}>
        <Text>Repair Men</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}} />
      <TouchableOpacity onPress={AnnouncementsList} style={{ marginVertical: 25, alignItems:"center" }}>
        <Text>Announcements</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}} />
      <TouchableOpacity onPress={PaymentsList} style={{ marginVertical: 25, alignItems:"center" }}>
        <Text>Payments</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}} />
      <TouchableOpacity onPress={LostAndFoundList} style={{ marginVertical: 25, alignItems:"center" }}>
        <Text>Lost And Found</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}} />
      <TouchableOpacity onPress={LaundryList} style={{ marginVertical: 25, alignItems:"center" }}>
        <Text>Laundry</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}} />
      <TouchableOpacity onPress={VisitorsList} style={{ marginVertical: 25, alignItems:"center" }}>
        <Text>Visitors</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}} />
    </View>
  );
};

export default Management;