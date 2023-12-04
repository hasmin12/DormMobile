import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, Alert, Modal, TextInput,StyleSheet, Image,ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';
import Input from '../../shared/Form/Input';
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Toast from 'react-native-toast-message';
import { updateResident } from '../../redux/actions/adminAction';
import { useDispatch } from 'react-redux';
import FormContainer from '../../shared/Form/FormContainer';
import url from '../../assets/common/url';
const ResidentsList = () => {
  const dispatch = useDispatch();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
    
        if (selectedDate) {
            setBirthdate(selectedDate);
        }
    };
    const [id, setId] = useState('');
    const [Tuptnum, setTuptnum] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [sex, setsex] = useState('');
    const [contacts, setContacts] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // To store the data of the selected user for editing
  const [addModalVisible, setAddModalVisible] = useState(false);
  // const itemsPerPage = 10;

  const getAuthToken = async () => {
    return AsyncStorage.getItem('token');
  };
  const fetchUsers = async () => {
    try {
      const token = await getAuthToken();
      // const response = await axios.get(${baseURL}/getResidents/${currentPage}, {
      const response = await axios.get(`${baseURL}`/user, {

        headers: {
          Authorization: Bearer `${token}`,
        },
      });
      console.log(response.data);

      setUsers(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error.response); 
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // useEffect(() => {
  //   // Update state when selectedUser changes
  //   if (selectedUser) {
  //     setTuptnum(selectedUser.Tuptnum);
  //     setName(selectedUser.name);
  //     setAddress(selectedUser.address);
  //     setsex(selectedUser.sex);
  //     setContacts(selectedUser.contacts);
  //     setBirthdate(new Date(selectedUser.birthdate));
  //   }
  // }, [selectedUser]);
  const handleEdit = (user) => {
    // setSelectedUser(user);
    setId(user.id);
    setTuptnum(user.Tuptnum);
    setName(user.name);
    setAddress(user.address);
    setsex(user.sex);
    setContacts(user.contacts);
    setBirthdate(new Date(user.birthdate));
    setEditModalVisible(true);
  };

  const handleAdd = () => {
    // Open the add modal
    setAddModalVisible(true);
  };

  const handleAddModalClose = () => {
    // Close the add modal
    setAddModalVisible(false);
  };

  const handleSaveAdd = () => {
    // Open the add modal
    // setAddModalVisible(true);
  };
  

  const handleEditModalClose = () => {
    // Clear the selected user data and hide the edit modal
    setSelectedUser(null);
    setEditModalVisible(false);
  };

  const handleSaveEdit = async () => {
    try {
      const token = await getAuthToken();

      const formattedBirthdate = format(birthdate, 'yyyy-MM-dd');
      const formData = new FormData();
      formData.append('Tuptnum', Tuptnum);
      formData.append('name', name);
      formData.append('address', address);
      formData.append('sex', sex);
      formData.append('contacts', contacts);
      formData.append('birthdate', formattedBirthdate);
      console.log("form:", formData);
  
      dispatch(updateResident(id, formData));
  
      handleEditModalClose();
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
    }
  };
  
  
  


  const renderUserItem = ({ item }) => {
    

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, borderBottomWidth: 1, borderColor: '#ccc' }}>
      {/* Image List Column */}
      <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 5 }}>
        <Image source={{ uri: `${url}${item.img_path}` }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      </View>

      {/* Name and Tuptnum Column */}
      <View style={{ flexDirection: 'column', marginRight: 12, width:160  }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 12 }}> {item.Tuptnum}</Text>
        {/* <Text>{url}{item.img_path}</Text> */}

        {/* <Text>Role: {item.role}</Text> */}
      </View>

      {/* Edit and Delete Buttons Column */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <View style={{ marginLeft: 10 }}>
          <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
        </View>
      </View>
    </View>
    );
  };

  const handleDelete = async (userId) => {
    try {
        // Show a confirmation alert before proceeding with deletion
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this resident?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: async () => {
                const token = await getAuthToken();
                // Implement your delete logic here using axios
                await axios.delete(`${baseURL}`/user/`${userId}`, {
                  headers: {
                    Authorization: Bearer `${token}`,
                  },
                });
                fetchUsers();
                console.log('User deleted successfully');
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "User deleted successfully",
                
                  });
                // Refresh the user data after deletion
                
              },
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        console.error('Error deleting user:', error.response);
      }
  };
  const TableHeader = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ccc',justifyContent:'space-between' }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 30 }}>
          <Text style={{ fontWeight: 'bold' }}>Residents</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', marginRight: 30 }}>Actions</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.content}>
   
      <TableHeader />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserItem}
        />
      )}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={() => handleAdd()} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>+</Text>
        </TouchableOpacity>
      </View>

       {/* Add Modal */}
       <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleAddModalClose}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Your add modal content goes here */}
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text>Add User</Text>
            {/* Add your input fields and buttons for adding a user */}
            {/* For example: */}
            <Input label="Tuptnum" value={Tuptnum} onChangeText={setTuptnum} />
            {/* ... (other input fields) */}
            <View>
              <Button title="Save" onPress={handleSaveAdd} color="green" />
              <Button title="Cancel" onPress={handleAddModalClose} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleEditModalClose}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text>Edit User</Text>
            <Input label="Tuptnum" value={Tuptnum} onChangeText={setTuptnum} />
            <Input label="Name" value={name} onChangeText={setName} />
            <Input label="Address" value={address} onChangeText={setAddress} />
            <Input label="Sex" value={sex} onChangeText={setsex} />
            <Input label="Contacts" value={contacts} onChangeText={setContacts} />
            <Input
                    placeholder="Select Birthdate"
                    value={birthdate ? format(birthdate, 'yyyy-MM-dd') : ''}
                    onFocus={() => setShowDatePicker(true)}
                  />
            {showDatePicker && (
                    <DateTimePicker
                      value={birthdate instanceof Date ? birthdate : new Date()}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
               

               <View>
                  <Button title="Save" onPress={handleSaveEdit} color="green"/> 
                  <Button title="Cancel" onPress={handleEditModalClose} color="red"/>
                 
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#ccc', // Add a background color for better visibility
    },
    imagePicker: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
    },
    content: {
      flex: 1,
      marginBottom: 16, // Set your desired margin here
    },
    saveButton: {
      backgroundColor: 'green',  // Change background color for the Save button
      marginRight: 10,  // Add margin to create a gap
    },

    cancelButton: {
        backgroundColor: 'red',  // Change background color for the Cancel button
    },

    addButtonContainer: {
      position: 'absolute',
      bottom: 16, // Adjust the bottom distance as needed
      left: 16, // Adjust the right distance as needed
    },
  
    addButton: {
      backgroundColor: 'blue',
      borderRadius: 50, // Make it a circle by setting borderRadius to half of the width and height
      width: 50, // Adjust the width as needed
      height: 50, // Adjust the height as needed
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    addButtonLabel: {
      color: 'white',
      fontSize: 24, // Adjust the font size as needed
      fontWeight: 'bold',
    },

    
});
export default ResidentsList;