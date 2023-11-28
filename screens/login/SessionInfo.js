// Import necessary React Native components
import React,{useState} from 'react';
import { View, Text, FlatList, StyleSheet, Modal, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListView from '../login/components/ListView';
const yoga = require('../../assets/images/yoga.png');
const foodIcon = require('../../assets/images/foodIcon.png');
const medicineIcon = require('../../assets/images/medicine.jpg');
const exerciseIcon = require('../../assets/images/exerciseIcon.jpg');

// Dummy data for patient sessions (replace this with your actual data)



  const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.";

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
];

// Define the PatientHistorySessions component
const SessionInfo = ({route}) => {
  const [isModalVisible, setModalVisible] = useState(false);



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    //isModalVisible= (!isModalVisible);
  };

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
        return <View style={styles.separator}></View>
    }
    const getIconType=(item) =>{
      if(item.type === 'Food') return foodIcon;
      else if(item.type === 'Medicines') return medicineIcon;
      else if(item.type === 'Exercise') return exerciseIcon;
      else return foodIcon;
    };

    renderSessionItem = ({item}) => {
        return (
            <View style={{flex:1}}>
             <TouchableOpacity onPress={() => viewItem(item)} underlayColor="white">
             <View style = {{flexDirection:'row', marginTop:30, marginLeft:10}}>
               <Image style = {{backgroundColor:'red', width:100, height:100}} source={getIconType(item)} />
               <View style={stylesNew.item} >
            
               <Text style={stylesNew.text}>{item.type}</Text>
               </View>
               {/* <View style = {{backgroundColor:'green', flex:0.9, justifyContent:'space-between'}}>
                  <Text>{item.type}</Text>
                  <Text>{item.description}</Text>
               </View> */}
             </View>
             </TouchableOpacity>

            </View>
        )
    };

    renderSessionItemNew = ({item}) => {
      return (

        <View style={stylesImage.container}>
        <TouchableOpacity onPress={() => viewItem(item)} underlayColor="white">
        <View style={stylesImage.imageContainer}>
          <Image
            source={getIconType(item)}
            style={stylesImage.image}
          />
        </View>
        </TouchableOpacity>
      </View>

        
      )
  };

  renderSessionItemNewSimple = ({item}) => {
    return (

      <TouchableOpacity
      style={stylesNew.itemContainerNew}
    >
      <View style={stylesNew.itemNew}>
        {/* <Text style={stylesNew.text}>Doctor: {item.doctor}</Text> */}
        {/* {userType == ROLES. && (<Text style={stylesNew.text}>Doctor: {item.patient}</Text>)} */}
        {/* {userType == ROLES.PATIENT && (<Text style={stylesNew.text}>Doctor: {item.doctor}</Text>)} */}
        {/* <Text style={stylesNew.text}>Visit Date: {new Date(item.visitTime).toLocaleDateString('en-US',{year: 'numeric', month: '2-digit', day:'2-digit'})}</Text> */}
        <Text style={stylesNew.textNew}> {item}</Text>
      </View>
    </TouchableOpacity>

      
    )
};

  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={stylesNew.itemContainer}
          onPress={() => navigation.navigate('SessionInfo', { data: item })}
        >
          <View style={stylesNew.item} >
            
            <Text style={stylesNew.text}>Doctor: {data.doctor}</Text>
            <Text style={stylesNew.text}>Visit Date: {new Date(data.visitTime).toLocaleDateString('en-US',{year: 'numeric', month: '2-digit', day:'2-digit'})}</Text>
            <Text style={stylesNew.text}>Disease: {data.disease}</Text>



      
            {/* <Text style={stylesNew.text}>Diagnose: {data.simpletiles.join('\n')}</Text> */}
            {/* <TouchableOpacity
        style={stylesNew.button}
        onPress={() => navigation.navigate('SessionInfo', { data: item })}
      >
        <Text style={styles.buttonText}>View Transcript</Text>
      </TouchableOpacity> */}
      {/* <View style={stylesModal.container}> */}
      <TouchableOpacity onPress={toggleModal} style={stylesNew.button}>
            <Text style={styles.buttonText}>View Summary</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={stylesModal.modalContainer}>
          <View style={stylesModal.modalContent}>
            <ScrollView>
              <Text>{loremIpsumText}</Text>
            </ScrollView>
            <TouchableOpacity onPress={toggleModal} style={stylesModal.closeButton}>
              <Text style={stylesModal.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* </View> */}
          </View>
        </TouchableOpacity>

      <FlatList
        data={patientSessions}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderSessionItemNew}
        ItemSeparatorComponent = {ItemSeparator}
      />
       <FlatList
        data={data.simpletiles}
        // numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderSessionItemNewSimple}
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
  },separator: {
    height: 20, // Adjust the height to control the spacing between rows
    backgroundColor: 'transparent', // Set the background color as needed
  },
});
const stylesNew = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    //backgroundColor: '#ecf0f1', // Background color for the entire screen
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#003087',
    overflow: 'hidden', // Ensure rounded corners are applied
  },
  itemContainerNew: {
    marginBottom: 10,
    borderRadius: 10,
    //backgroundColor: '#003087',
    overflow: 'hidden', // Ensure rounded corners are applied
  },
  item: {
    padding: 15,
    backgroundColor: '#3498db', // Background color for each tile
    borderRadius: 10,
  },
  itemNew: {
    padding: 10,
    //backgroundColor: '#3498db', // Background color for each tile
    backgroundColor: '#e0813d',
    borderRadius: 30,
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
  textNew: {
    color: '#fff', // Text color
    marginBottom: 5,
    fontSize:25,
  },
});



const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '80%', // Set a maximum height for the modal content
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

const stylesImage = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 2, // Border width
    borderRadius: 10, // Border radius
    borderColor: 'black', // Border color
    padding: 5, // Padding around the image
    shadowColor: 'black', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android elevation for shadow
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5, // Border radius for the image itself
  },
});




// Export the component
export default SessionInfo;