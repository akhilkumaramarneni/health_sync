import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
const yoga = require('../../assets/images/yoga.png');

const MedicineDetails = ({ route }) => {
    const { role } = route.params;
  
    const [medicines, setMedicines] = useState([
      {
        id: '1',
        name: 'Tylenol 500 mg',
        description: 'Treat minor aches, and reduces fever',
        dosage: 'Twice a day',
        image: yoga,
      },
      {
        id: '2',
        name: 'Azithromycin 250 mg',
        description: 'Treat bacterial infections',
        dosage: 'Once a day',
        image: yoga,
      },
      // Add more medicine items as needed
    ]);
  
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
            <Text style={styles.medicineDescription}>{item.description}</Text>
            <Text style={styles.medicineDosage}>{item.dosage}</Text>
          </View>
          {role === 'doctor' && (
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMedicine(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
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
    };
  
    const deleteMedicine = (id) => {
      const updatedMedicines = medicines.filter((medicine) => medicine.id !== id);
      setMedicines(updatedMedicines);
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {role === 'doctor' && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Medicine Name"
              value={newMedicineName}
              onChangeText={setNewMedicineName}
            />
            <TextInput
              style={styles.input}
              placeholder="Medicine Description"
              value={newMedicineDescription}
              onChangeText={setNewMedicineDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Dosage"
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
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#ffffff',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    formContainer: {
      marginBottom: 20,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#F8DCE1',
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
      backgroundColor: '#F8DCE1',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    textContainer: {
      flex: 1,
    },
    medicineName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
    },
    medicineDescription: {
      color: '#666666',
      marginTop: 2,
    },
    medicineDosage: {
      color: '#666666',
      fontWeight: 'bold',
      marginTop: 3,
    },
    addButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#007AFF',
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
  });
  
  export default MedicineDetails;