import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginDorm } from '../../redux/actions/UserAction';
import Input from '../../shared/Form/Input';
import EasyButton from '../../shared/StyledComponents/EasyButton';
import { useNavigation } from '@react-navigation/native';
import FormContainer from '../../shared/Form/FormContainer';

const DormitoryLogin = () => {
  const { isAuthenticated, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuthenticated) {
        // navigation.navigate('AdminDashboard');
    }
    if (error) {
      console.log(error);
      // Handle error notification or alert here
    }
  }, [dispatch, isAuthenticated, error, navigation]);

  const handleSubmit = () => {
    dispatch(loginDorm(email, password));
  };

  return (
    <View style={styles.container}>
    {/* <View style={{backgroundColor:'#ffffcc'}}> */}
      {/* <FormContainer title={"DormXtend"}> */}
      <Text style={styles.text}>Dormitory</Text>
        <Input
          placeholder="Enter email"
          name="email"
          id="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Enter Password"
          name="password"
          id="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          <EasyButton large primary onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>Login</Text>
          </EasyButton>
        </View>
      {/* </FormContainer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#d3ffd3'
    backgroundColor:'#ffffcc'
  },
  text: {
    alignSelf: 'center',
    color: 'black', // Customize text color
    fontSize: 18, // Customize text size
  },
});

export default DormitoryLogin;