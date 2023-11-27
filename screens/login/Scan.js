// QRScannerScreen.js
import React from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Scan = ({ navigation }) => {
  const handleScan = (e) => {
    console.log("Handle Scan")
    console.log(e.data);
    console.log(e);
    
    // You can add additional logic here to handle the scanned text
    navigation.goBack(); // Go back to the previous screen after scanning
  };

  return (
    <View style={{ flex: 1 }}>
      <QRCodeScanner
        onRead={handleScan}
        showMarker
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('SessionsPreviousHistory')}
        activeOpacity={0}
        >
        <Text style={styles.text}> </Text>
       </TouchableOpacity>
      <Button title="Close Scanner" onPress={() => navigation.goBack()} />
    </View>
  );
};


const styles = StyleSheet.create({

  text: {
    color: 'black', // Black text color for general text
  },
  button: {
      display: 'transparent',
      backgroundColor: '#007ACC', // Button background color
      padding: 25, // Button padding
      alignItems: 'center', // Center text horizontally
      justifyContent: 'center', // Center text vertically
      width: '100%', // Make the button extend full width
      // borderRadius: 5, // Rounded corners
      opacity: 0, // Make the button invisible but still clickable
    },
  // ... other styles ...
});
export default Scan;
