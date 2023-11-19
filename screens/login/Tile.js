// Import necessary React Native components
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const yoga = require('../../assets/images/yoga.png');

// Dummy data for patient sessions (replace this with your actual data)

const patientSessions = [
    {
        id: 1,
        type: 'Food',
        description: 'Take 2, get neat desc',
        image : '',
        diseaseinfo: {
        },
      },
      {
        id: 2,
        type: 'Exercise',
        description: 'Take 2, get neat desc2',
        image : '',
        diseaseinfo: {
        },
      },
      {
        id: 3,
        type: 'Medicines',
        description: 'Take 2, get neat desc3',
        image : '',
        diseaseinfo: {
        },
      },
      {
        id: 4,
        type: 'Exercise',
        description: 'Take 2, get neat desc4',
        image : '',
        diseaseinfo: {
        },
      },
];

// Define the PatientHistorySessions component
const Tile = () => {

    const navigation = useNavigation();

    viewItem = item => {
        console.log("navigate to tile page for patient")
       
        navigation.navigate('Tile');
        // this.props.navigation.navigate('FoodDetails', {
        //   item,
        // });
      };

    const ItemSeparator=()=>{
        return <View style={{backgroundColor:'blue'}}></View>
    }

    renderSessionItem = ({item}) => {
        return (
            <View style={{flex:1}}>
             
             <View style = {{flexDirection:'row', marginTop:30, marginLeft:10}}>
               <Image style = {{backgroundColor:'red', width:100, height:100}} source={yoga} />
               <View style = {{backgroundColor:'green', flex:0.9, justifyContent:'space-between'}}>
                  <Text>{item.type}</Text>
                  <Text>{item.description}</Text>
               </View>

             </View>

            </View>
        )
    };

  return (
    <View style={styles.container}>
      <FlatList
        data={patientSessions}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderSessionItem}
        ItemSeparatorComponent = {ItemSeparator}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
});

// Export the component
export default Tile;