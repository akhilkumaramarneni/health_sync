import React, { useState } from 'react';
import { View, Button, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchableTileView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCare, setSelectedCare] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigation = useNavigation();

  const dummyData = [
    {
      id: 1,
      disease: 'Diabetes',
      care: [
        { text: 'Regular blood sugar monitoring', flag: 'complex' },
        { text: 'Maintaining a balanced diet', flag: 'simple' },
        { text: 'Regular physical activity', flag: 'simple' },
        { text: 'Diabetes medication as prescribed', flag: 'complex' },
        { text: 'Routine check-ups with a healthcare provider', flag: 'simple' }
      ]
    },
    {
      id: 2,
      disease: 'Hypertension',
      care: [
        { text: 'Monitoring blood pressure regularly', flag: 'simple' },
        { text: 'Following a low-sodium diet', flag: 'simple' },
        { text: 'Regular exercise', flag: 'simple' },
        { text: 'Stress management techniques', flag: 'complex' },
        { text: 'Taking prescribed blood pressure medications', flag: 'complex' }
      ]
    },
    {
      id: 3,
      disease: 'Asthma',
      care: [
        { text: 'Avoiding asthma triggers', flag: 'complex' },
        { text: 'Using inhalers as prescribed', flag: 'simple' },
        { text: 'Regular lung function tests', flag: 'complex' },
        { text: 'Having an asthma action plan', flag: 'complex' },
        { text: 'Getting regular physical activity within comfort', flag: 'simple' }
      ]
    },
    {
      id: 4,
      disease: 'Depression',
      care: [
        { text: 'Adhering to prescribed medication', flag: 'simple' },
        { text: 'Regular therapy or counseling sessions', flag: 'complex' },
        { text: 'Engaging in physical activity', flag: 'simple' },
        { text: 'Maintaining a regular sleep schedule', flag: 'simple' },
        { text: 'Building a support network of friends and family', flag: 'complex' }
      ]
    },
    {
      id: 5,
      disease: 'Heart Disease',
      care: [
        { text: 'Following a heart-healthy diet', flag: 'simple' },
        { text: 'Regular exercise and physical activity', flag: 'complex' },
        { text: 'Monitoring cholesterol and blood pressure', flag: 'simple' },
        { text: 'Avoiding smoking and limiting alcohol intake', flag: 'complex' },
        { text: 'Regular check-ups with a cardiologist', flag: 'simple' }
      ]
    }
    // ... you can add more diseases and their care with flags ...
  ];
  
  

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = dummyData.filter(item => 
        item.disease.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
      setSelectedCare(null); // Reset the selectedCare when a new search is performed
    } else {
      setFilteredData([]);
      setSelectedCare(null); // Also reset selectedCare when the search query is cleared
    }
  };
  

  const handleItemClick = (careItem) => {
    console.log(careItem)
    if (!selectedItems.includes(careItem)) {
        setSelectedItems([...selectedItems, careItem]);
    }
    
    console.log(selectedItems)

    if (careItem.flag === 'simple') {
      handleSimpleClick(careItem.text);
    } else if (careItem.flag === 'complex') {
      handleComplexClick(careItem.text);
    }
  };

  const handleSimpleClick = (text) => {
    console.log(`Simple item clicked: ${text}`);
    // Add logic for simple items
  };

  const handleComplexClick = (text) => {
    console.log(`Complex item clicked: ${text}`);
    // Add logic for complex items
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchBar, styles.text]}
        placeholder="Search here..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView style={styles.tileContainer}>
        {/* ... other component code ... */}
        {filteredData.length > 0 && !selectedCare && (
          filteredData.map(item => (
            <TouchableOpacity key={item.id} style={styles.tile} onPress={() => setSelectedCare(item.care)}>
              <Text style={styles.text}>{item.disease}</Text>
            </TouchableOpacity>
          ))
        )}
        {selectedCare && (
            selectedCare.map((careItem, index) => (
            <TouchableOpacity 
                key={index} 
                style={styles.tile} 
                onPress={() => handleItemClick(careItem)}
            >
                <Text style={styles.text}>{careItem.text}</Text>
            </TouchableOpacity>
            ))
        )}
      </ScrollView>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Cart', { items: selectedItems })}
        >
        <Text style={styles.text}>Go to Prescription</Text>
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // ... other container styles ...
    },
    searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 8,
      color: 'black', // Black text color for the search bar
    },
    tileContainer: {
      flex: 1,
      // ... other tile container styles ...
    },
    tile: {
      backgroundColor: '#ddd',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      // ... other tile styles ...
    },
    noResultsText: {
      marginTop: 20,
      textAlign: 'center',
      color: 'black', // Black text color for the no results text
    },
    // Add a general text style for other text elements
    text: {
      color: 'black', // Black text color for general text
    },
    button: {
        backgroundColor: '#007ACC', // Button background color
        padding: 15, // Button padding
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        width: '100%', // Make the button extend full width
        borderRadius: 5, // Rounded corners
      },
    // ... other styles ...
  });
  

export default SearchableTileView;