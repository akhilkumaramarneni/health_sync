// QRScannerScreen.js
import React from 'react';
import { View, Button } from 'react-native';
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
      <Button title="Close Scanner" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Scan;
