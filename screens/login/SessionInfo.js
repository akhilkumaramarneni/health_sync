// Import necessary React Native components
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListView from '../login/components/ListView';
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
const SessionInfo = ({route}) => {

  const {data} = route.params; 

  console.log("----------------------------------------");
  const prettyJson = JSON.stringify(data, null, 2);
  console.log(prettyJson);

    const navigation = useNavigation();

    const viewItem = (item) => {
        console.log("navigate to details page for patient", item)
       
        if(item.type === 'Food') navigation.navigate('FoodDetails', { data: data});
        else if(item.type === 'Medicines') navigation.navigate('MedicineDetails',{ data: data });
        else if(item.type === 'Exercise') navigation.navigate('ExerciseDetails',{ data: data });
        
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
             <TouchableOpacity onPress={() => viewItem(item)} underlayColor="white">
             <View style = {{flexDirection:'row', marginTop:30, marginLeft:10}}>
               <Image style = {{backgroundColor:'red', width:100, height:100}} source={yoga} />
               <View style = {{backgroundColor:'green', flex:0.9, justifyContent:'space-between'}}>
                  <Text>{item.type}</Text>
                  <Text>{item.description}</Text>
               </View>
             </View>
             </TouchableOpacity>

            </View>
        )
    };

  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'pink', flex: 0.5}}>
           <Text> Summary + transcipts | audio show</Text>
        </View>
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
export default SessionInfo;