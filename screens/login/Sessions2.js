// Import necessary React Native components
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ListView from '../login/components/ListView';
import { useNavigation } from '@react-navigation/native';

// Dummy data for patient sessions (replace this with your actual data)

const patientSessions = [
    {
        id: 1,
        doctorname: 'Spicy Teriyaki',
        visittime: 19.25,
        location: 'spicy-teriyaki.jpg',
        image : 'assets/images/couple.jpg',
        diseaseinfo: {
        },
      },
      {
        id: 2,
        doctorname: 'Spicy Teriyaki',
        visittime: 19.25,
        location: 'spicy-teriyaki.jpg',
        image : 'assets/images/couple.jpg',
        diseaseinfo: {
        },
      },
      {
        id: 3,
        doctorname: 'Spicy Teriyaki',
        visittime: 19.25,
        location: 'spicy-teriyaki.jpg',
        image : 'assets/images/couple.jpg',
        diseaseinfo: {
        },
      },
];

// Define the PatientHistorySessions component
const Sessions2 = () => {

    const navigation = useNavigation();

    viewItem = item => {
        console.log("navigate to tile page for patient")
       
        navigation.navigate('Tile');
        // this.props.navigation.navigate('FoodDetails', {
        //   item,
        // });
      };

    renderSessionItem = ({item}) => {
        return <ListView item={item} viewItem={this.viewItem} />;
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient History Sessions</Text>
      <FlatList
        data={patientSessions}
        keyExtractor={(item) => item.id}
        renderItem={renderSessionItem}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sessionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    marginBottom: 8,
  },
});

// Export the component
export default Sessions2;