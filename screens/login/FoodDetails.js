import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
const yoga = require('../../assets/images/yoga.png');
import { saveDetails } from '../../store/Details';
import Modal from 'react-native-modal';

const FoodDetails = ({ route }) => {

    const { role, patientId } = route.params;
    const { data } = route.params;

    const [foodsToEat, setFoodsToEat] = useState([]);
    const [foodsNotToEat, setFoodsNotToEat] = useState([]);
    const [newFoodName, setNewFoodName] = useState('');
    const [newFoodDescription, setNewFoodDescription] = useState('');
    const [newFoodExamples, setNewFoodExamples] = useState('');
    const [editable, setEditable] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [doubleClickedItem, setDoubleClickedItem] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (data && data.complextiles && data.complextiles.length > 0) {
          const foodTiles = data.complextiles.find(tile => tile.type === 'food');
    
          if (foodTiles && foodTiles.todo && foodTiles.todo.length > 0) {
            const toEat = foodTiles.todo.map(food => ({
              id: Math.random().toString(),
              name: food.type,
              description: food.description,
              examples: food.suggestions.join(', '),
              image: yoga, // Assuming this is the default image
            }));
            setFoodsToEat(toEat);
          }
    
          if (foodTiles && foodTiles.notTodos && foodTiles.notTodos.length > 0) {
            const notToEat = foodTiles.notTodos.map(food => ({
              id: Math.random().toString(),
              name: food.type,
              description: food.description,
              examples: food.suggestions.join(', '),
              image: yoga, // Assuming this is the default image
            }));
            setFoodsNotToEat(notToEat);
          }
        }
    }, [data]);
  
    const handleAddNewFood = (toEat) => {
        if (newFoodName && newFoodDescription && newFoodExamples) {
          const newFood = {
            id: Math.random().toString(),
            name: newFoodName,
            description: newFoodDescription,
            examples: newFoodExamples,
            image: yoga, // Assuming this is the default image
          };
    
          if (toEat) {
            setFoodsToEat([...foodsToEat, newFood]);
          } else {
            setFoodsNotToEat([...foodsNotToEat, newFood]);
          }
    
          setNewFoodName('');
          setNewFoodDescription('');
          setNewFoodExamples('');
    
          // Call function to store updated data
          storeUpdatedData();
        }
    };
      

    const handleDoubleClick = (id, toEat) => {
        if (id) {
            if (!toEat && doubleClickedItem === id) {
              const updatedFoodsNotToEat = foodsNotToEat.filter(item => item.id !== id);
              setFoodsNotToEat(updatedFoodsNotToEat);
              setDoubleClickedItem(null); // Reset double-clicked item after deletion
              // Call function to store updated data
              storeUpdatedData();
            } else {
              setDoubleClickedItem(id);
            }
        }
    };
    
    const handleDelete = (id, toEat) => { // Receive id as a parameter
        if (toEat) {
          const updatedFoodsToEat = foodsToEat.filter(item => item.id !== id); // Use id for comparison
          setFoodsToEat(updatedFoodsToEat);
        } else {
          const updatedFoodsNotToEat = foodsNotToEat.filter(item => item.id !== id); // Use id for comparison
          setFoodsNotToEat(updatedFoodsNotToEat);
        }
        // Call function to store updated data
        storeUpdatedData();
    };

    const storeUpdatedData = () => {
        const updatedFoodTiles = {
          type: 'food',
          todo: foodsToEat.map(food => ({
            type: food.name,
            description: food.description,
            suggestions: food.examples.split(',').map(example => example.trim())
          })),
          notTodo: foodsNotToEat.map(food => ({
            type: food.name,
            description: food.description,
            suggestions: food.examples.split(',').map(example => example.trim())
          }))
        };
    
        // Update the data with the modified food tiles
        const updatedData = { ...data }; // Assuming 'data' is available in the component
        if (updatedData.complextiles) {
          const foodTileIndex = updatedData.complextiles.findIndex(tile => tile.type === 'food');
          if (foodTileIndex !== -1) {
            updatedData.complextiles[foodTileIndex].todo = updatedFoodTiles.todo;
            updatedData.complextiles[foodTileIndex].notTodo = updatedFoodTiles.notTodo;
          }
        }

        // Call function to save or process the updated data (e.g., send to an API)
        saveDetails(updatedData.complextiles);
    };

    const submitDetails = () => {
        storeUpdatedData();
        setShowSuccessMessage(true);

        // Hide the modal after 1 second
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 900);
      };

    const renderFoodItem = ( item , toEat) => {
        if (!item) {
            return null; // Handle the case where item is undefined/null
        }
        
        return (
            <TouchableOpacity
                style={styles.foodCard}
                onPress={() => handleDoubleClick(item.id)}
            >
            <Image source={item.image} style={styles.foodImage} />
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodDescription}>{item.description}</Text>
            <Text style={styles.foodExamples}>{item.examples}</Text>

            {doubleClickedItem === item.id && (
                <View style={styles.deleteContainer}>
                    <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id, toEat)} // Passing item.id here
                    >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                )}
            </TouchableOpacity>
        );
    };

    
  
    const renderFoodList = (foods, toEat) => (
        <FlatList
        horizontal
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderFoodItem(item, toEat)} // Pass 'toEat' variable to renderFoodItem
        showsHorizontalScrollIndicator={false}
        />
    );
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/fooddetails.png')} style={styles.image} />
        </View> */}
  
        {role === 'doctor' && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter food name"
              value={newFoodName}
              onChangeText={setNewFoodName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter food description"
              value={newFoodDescription}
              onChangeText={setNewFoodDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter food examples"
              value={newFoodExamples}
              onChangeText={setNewFoodExamples}
            />
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => handleAddNewFood(true)}
            >
              <Text style={styles.addButtonText}>Add New Food to Eat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: '#FF5722' }]}
              onPress={() => handleAddNewFood(false)}
            >
              <Text style={styles.addButtonText}>Add New Food Not to Eat</Text>
            </TouchableOpacity>
            {role === 'doctor' && (
                <TouchableOpacity
                style={[styles.editButton, { backgroundColor: '#007AFF' }]}
                onPress={submitDetails}
                >
                <Text style={styles.editButtonText}>Submit Details</Text>
                </TouchableOpacity>
            )}
            <Modal isVisible={showSuccessMessage} style={styles.modal}>
                <View style={styles.successMessage}>
                    <Text style={styles.successText}>Food Details successfully submitted!</Text>
                </View>
            </Modal>
          </View>
        )}
  
        <Text style={styles.sectionHeading}>What to Eat</Text>
        {renderFoodList(foodsToEat, true)}
  
        <Text style={styles.sectionHeading}>What Not to Eat</Text>
        {renderFoodList(foodsNotToEat, false)}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0.5,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#007AFF',
    textAlign: 'center',
  },
  foodCard: {
    width: 150,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#F8DCE1',
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  foodName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  foodDescription: {
    textAlign: 'center',
    color: '#666666',
  },
  foodExamples: {
    textAlign: 'center',
    color: '#666666',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  deleteContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontWeight: 'bold',
    borderColor: '#CCCCCC',
  },
  formContainer: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#F8DCE1',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  editButton: {
    marginBottom: 0.1,
    padding: 4,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    color: '#ffffff', // Change the text color to white
    fontSize: 16,
    fontWeight: 'bold',
},
  modal: {
    justifyContent: 'center',
    margin: 0,
},
});

export default FoodDetails;
