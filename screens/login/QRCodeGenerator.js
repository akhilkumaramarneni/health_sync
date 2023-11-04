// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../../store/AuthContext';
const QRCodeGenerator = ({ route }) => {
  // const { username } = route.params;
  const { loggedInUserName } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {loggedInUserName}!</Text>
      <QRCode value={loggedInUserName} size={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default QRCodeGenerator;
