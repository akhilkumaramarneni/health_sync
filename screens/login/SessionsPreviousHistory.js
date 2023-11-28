// Import necessary React Native components
import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import ListView from './components/ListView';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../store/AuthContext';
import { ROLES } from '../../constants'
import { RollInLeft } from 'react-native-reanimated';
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
const SessionsPreviousHistory = () => {


    const navigation = useNavigation();
    //const { setLoggedInUserType, userType, setLoggedInUserName, } = useAuth();
    const { setLoggedInUserType, userType, setLoggedInUserName, setAllSessionsData,  allSessionsData,loggedInUserName} = useAuth();
console.log("hello data")
console.log("-------------------------");
console.log(loggedInUserName);
console.log("-------------------------");
const prettyJson = JSON.stringify(allSessionsData, null, 2);
console.log(prettyJson);
//console.log(allSessionsData)

    viewItem = item => {
        console.log("navigate to tile page for patient")
        navigation.navigate('SessionInfo');
        // this.props.navigation.navigate('FoodDetails', {
        //   item,
        // });
      };
      const renderItem = ({ item }) => (
        <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text>Doctor: {item.doctor}</Text>
          <Text>Visit Date: {item.visitTime}</Text>
          <Text>Simple Tiles: {item.simpletiles.join(', ')}</Text>
        </View>
      );

      const renderItemNew = ({ item }) => (
        <View style={stylesNew.itemContainer}>
          <View style={stylesNew.item}>
            <Text style={stylesNew.text}>Doctor: {item.doctor}</Text>
            <Text style={stylesNew.text}>Visit Date: {item.visitTime}</Text>
            <Text style={stylesNew.text}>Simple Tiles: {item.simpletiles.join(', ')}</Text>
          </View>
        </View>
      );
      const renderItemNavigate = ({ item, navigation }) => (
        <TouchableOpacity
          style={stylesNew.itemContainer}
          onPress={() => navigation.navigate('SessionInfo', { data: item })}
        >
          <View style={stylesNew.item}>
            {/* <Text style={stylesNew.text}>Doctor: {item.doctor}</Text> */}
            {/* {userType == ROLES. && (<Text style={stylesNew.text}>Doctor: {item.patient}</Text>)} */}
            {userType == ROLES.PATIENT && (<Text style={stylesNew.text}>Doctor: {item.doctor}</Text>)}
            <Text style={stylesNew.text}>Visit Date: {new Date(item.visitTime).toLocaleDateString('en-US',{year: 'numeric', month: '2-digit', day:'2-digit'})}</Text>
            <Text style={stylesNew.text}>Disease: {item.disease}</Text>



      
            <Text style={stylesNew.text}>Diagnose: {item.simpletiles.join('\n')}</Text>
            <TouchableOpacity
        style={stylesNew.button}
        onPress={() => navigation.navigate('SessionInfo', { data: item })}
      >
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );

    renderSessionItem = ({item}) => {
        return <ListView item={item} viewItem={this.viewItem} />;
    };


    const getFilteredDataSorted = () => {

      filteredSessionsPatient = allSessionsData.filter((session)=>session.patient==="Christy");
      filteredSessionsPatient = [...filteredSessionsPatient].sort((a,b)=> new Date(b.visitTime).toLocaleDateString('en-US',{year: 'numeric', month: '2-digit', day:'2-digit'}).localeCompare(new Date(a.visitTime).toLocaleDateString('en-US',{year: 'numeric', month: '2-digit', day:'2-digit'})))
      const filteredSessionsDoctor = allSessionsData.filter((session)=> session.patient==="Christy").filter((session)=>session.doctor==="Dr. Jonathan");
      if(userType === ROLES.PATIENT) return filteredSessionsPatient;
      return filteredSessionsDoctor;
    };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Patient History Sessions</Text> */}
      <FlatList
        data={getFilteredDataSorted()}
        keyExtractor={(item,index) => index.toString()}
        renderItem={(item)=>renderItemNavigate({ ...item, navigation })}
      />
      {userType === ROLES.DOCTOR && (
        <View style={styles.buttonContainer}>
          <Button
            title="Create New Session"
            onPress={() =>  navigation.navigate('New Session')}
          />
        </View>
      )}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Patient History Sessions</Text>
  //     <FlatList
  //       data={patientSessions}
  //       keyExtractor={(item) => item.id}
  //       renderItem={renderSessionItem}
  //     />
  //     {userType === ROLES.DOCTOR && (
  //       <View style={styles.buttonContainer}>
  //         <Button
  //           title="Create New Session"
  //           onPress={() =>  navigation.navigate('New Session')}
  //         />
  //       </View>
  //     )}
  //   </View>
  // );
};
const stylesNew = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1', // Background color for the entire screen
  },
  itemContainer: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#003087',
    overflow: 'hidden', // Ensure rounded corners are applied
  },
  item: {
    padding: 15,
    backgroundColor: '#3498db', // Background color for each tile
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#32a85f',
    //'#2ecc71',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto'
  },
  buttonText: {
    color: '#fff',
    
  },
  text: {
    color: '#fff', // Text color
    marginBottom: 5,
  },
});

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
export default SessionsPreviousHistory;
