// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = ({ route }) => {
  // const { username } = route.params;
  const user = { username: "Patient" };
  const { username } = user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {username}!</Text>
      <QRCode value={username} size={200} />
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
