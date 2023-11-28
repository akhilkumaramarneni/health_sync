import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
const yoga = require('../../assets/images/medicineDetail.png');
import { useNavigation } from '@react-navigation/native';
import { saveDetailsMedicine } from '../../store/Details';
import Modal from 'react-native-modal';
import { useAuth } from '../../store/AuthContext';

const MedicineDetails = ({ route }) => {
    const { role } = route.params;
    const { data } = route.params;
    const [medicines, setMedicines] = useState([]);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const { setAllFoodData, setAllExcerciseData, setAllMedicineData} = useAuth();

    const navigation = useNavigation();

    useEffect(() => {
        if (data && data.complextiles && data.complextiles.length > 0) {
        const medicineTiles = data.complextiles.find(tile => tile.type === 'medicine');

        if (medicineTiles && medicineTiles.todo && medicineTiles.todo.length > 0) {
            const parsedMedicines = medicineTiles.todo.map(medicine => ({
            id: Math.random().toString(36).substring(7),
            name: medicine.type,
            // description: medicine.description,
            dosage: medicine.description, // Assuming description in JSON is dosage in code
            image: yoga, // You can replace this with actual images
            }));
            setMedicines(parsedMedicines);
        }
        }
    }, [data]);
  
    const [newMedicineName, setNewMedicineName] = useState('');
    const [newMedicineDescription, setNewMedicineDescription] = useState('');
    const [newMedicineDosage, setNewMedicineDosage] = useState('');
    const [newMedicineImage, setNewMedicineImage] = useState('');
  
    const renderMedicineList = () => (
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicineItem}
        showsVerticalScrollIndicator={false}
      />
    );
  
    const renderMedicineItems = medicines.map((item) => (
        <TouchableOpacity key={item.id} style={styles.medicineCard}>
          <Image source={item.image} style={styles.medicineImage} />
          <View style={styles.textContainer}>
            <Text style={styles.medicineName}>{item.name}</Text>
            {/* <Text style={styles.medicineDescription}>{item.description}</Text> */}
            <Text style={styles.medicineDosage}>{item.dosage}</Text>
          </View>
          {role === 'doctor' && (
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMedicine(item.id)}>
              <Text style={styles.deleteButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ));
  
    const addNewMedicine = () => {
      const newMedicine = {
        id: `${Math.random().toString(36).substring(7)}`,
        name: newMedicineName,
        description: newMedicineDescription,
        dosage: newMedicineDosage,
        image: yoga,
      };
  
      setMedicines([...medicines, newMedicine]);
      setNewMedicineName('');
      setNewMedicineDescription('');
      setNewMedicineDosage('');
      setNewMedicineImage('');

      saveUpdatedData();
    };
  
    const deleteMedicine = (id) => {
      const updatedMedicines = medicines.filter((medicine) => medicine.id !== id);
      setMedicines(updatedMedicines);

      saveUpdatedData();
    };

    const saveUpdatedData = () => {
        const updatedMedicineTiles = {
            type: 'medicine',
            todo: medicines.map((medicine) => ({
                type: medicine.name, // Assuming 'name' is equivalent to 'type' in JSON
                description: medicine.dosage,
            })),
        };
    
        let updatedData = { complextiles: [] }; // Initialize with an empty complextiles array if 'data' is undefined or null
        if (data && data.complextiles) {
            updatedData = { ...data };
        }
    
        const existingMedicineIndex = updatedData.complextiles.findIndex((tile) => tile.type === 'medicine');
        if (existingMedicineIndex !== -1) {
            updatedData.complextiles[existingMedicineIndex].todo = updatedMedicineTiles.todo;
        } else {
            updatedData.complextiles.push(updatedMedicineTiles);
        }
    
        // Call saveDetails function to store the updated data
        // saveDetailsMedicine(updatedData.complextiles);
        setAllMedicineData(updatedData.complextiles);
    };

    const submitDetails = () => {
        // Logic to prepare the updated data
        // Assuming saveUpdatedData function is present
      
        // Call the saveUpdatedData function
        saveUpdatedData();
        // Show success message
        setIsSuccessModalVisible(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
            setIsSuccessModalVisible(false);
        }, 800);

        // navigation.navigate('New Session');
    };
  
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {role === 'doctor' && (
                <View style={styles.formContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder="Medicine Name"
                    placeholderTextColor="#ffffff"
                    value={newMedicineName}
                    onChangeText={setNewMedicineName}
                    />
                    {/* <TextInput
                    style={styles.input}
                    placeholder="Medicine Description"
                    placeholderTextColor="#ffffff"
                    value={newMedicineDescription}
                    onChangeText={setNewMedicineDescription}
                    /> */}
                    <TextInput
                    style={styles.input}
                    placeholder="Dosage"
                    placeholderTextColor="#ffffff"
                    value={newMedicineDosage}
                    onChangeText={setNewMedicineDosage}
                    />
                    {/* <TextInput
                    style={styles.input}
                    placeholder="Image URL"
                    value={newMedicineImage}
                    onChangeText={setNewMedicineImage}
                    /> */}
                    <TouchableOpacity style={styles.addButton} onPress={addNewMedicine}>
                    <Text style={styles.addButtonText}>Add Medicine</Text>
                    </TouchableOpacity>
                </View>
                )}
                {renderMedicineItems}
            </ScrollView>
            {role === 'doctor' && (
                <TouchableOpacity style={styles.submitButtonContainer} onPress={submitDetails}>
                <Text style={styles.submitButtonText}>Submit Details</Text>
                </TouchableOpacity>
            )}

            <Modal isVisible={isSuccessModalVisible} style={styles.modal}>
                <View style={styles.successMessage}>
                <Text style={styles.successText}>Medicine Details successfully submitted</Text>
                </View>
            </Modal>
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 80, // Adjust this value to ensure content scrolls above the button
    },
    formContainer: {
      marginBottom: 20,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#3498db',
    },
    input: {
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    medicineCard: {
      marginBottom: 15,
      borderRadius: 10,
      backgroundColor: '#3498db',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    textContainer: {
      flex: 1,
    },
    medicineName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
    medicineDescription: {
      color: '#fff',
      marginTop: 2,
      fontSize: 17,
    },
    medicineDosage: {
      color: '#fff',
      fontWeight: 'bold',
      marginTop: 3,
    },
    addButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#32a85f',
      alignItems: 'center',
    },
    addButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    deleteButton: {
      marginLeft: 10,
      padding: 5,
      borderRadius: 5,
      backgroundColor: '#FF3B30',
    },
    deleteButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    medicineImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    submitButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: '#32a85f',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    submitButtonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: '#32a85f',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    successMessage: {
        marginTop: 15,
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 128, 0, 0.7)', // Adjust the color here (black with some opacity)
        paddingVertical: 10,
        marginBottom: 100, // Adjust this value to position the modal above the button
    },
    successText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modal: {
        justifyContent: 'center',
        margin: 0,
    },
  });
  
  export default MedicineDetails;