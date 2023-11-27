import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
const yoga = require('../../assets/images/yoga.png');

const FoodDetails = ({ route }) => {
    const { role, patientId } = route.params;
    const [foodsToEat, setFoodsToEat] = useState([]);
    const [foodsNotToEat, setFoodsNotToEat] = useState([]);
    const [newFoodName, setNewFoodName] = useState('');
    const [newFoodDescription, setNewFoodDescription] = useState('');
    const [newFoodExamples, setNewFoodExamples] = useState('');
    const [editable, setEditable] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [doubleClickedItem, setDoubleClickedItem] = useState(null);

    useEffect(() => {
        if (role === 'patient') {
          // Load initial dummy tiles for patients
          const initialDummyToEat = [
            { id: 'p1', name: 'Vegetables', image: yoga, description: 'Vitamins & fiber', examples: 'Broccoli, Spinach' },
            { id: 'p2', name: 'Whole grains', image: yoga, description: 'Rich in fiber', examples: 'Brown rice, Quinoa' },
            { id: 'p7', name: 'Fruits', image: yoga, description: 'Natural sugars', examples: 'Apples, Bananas' },
            { id: 'p8', name: 'Lean proteins', image: yoga, description: 'Muscle growth', examples: 'Chicken, Fish' },
          ];
    
          const initialDummyNotToEat = [
            { id: 'p3', name: 'Sugary drinks', image: yoga, description: 'High sugar content', examples: 'Soda, Juices' },
            { id: 'p4', name: 'Processed foods', image: yoga, description: 'High in additives', examples: 'Fast food, Snacks' },
            { id: 'p5', name: 'High-fat foods', image: yoga, description: 'Cholestrol increase', examples: 'Fried foods' },
            { id: 'p6', name: 'Sodium-rich foods', image: yoga, description: 'May increase BP', examples: 'Canned soups' },
          ];
    
          setFoodsToEat(initialDummyToEat);
          setFoodsNotToEat(initialDummyNotToEat);
        } else if (role === 'doctor') {
          // Retrieve previously selected tiles for the patient (Replace this logic with your actual implementation)
          const prevSelectedTilesToEat = [
            // Assuming retrieved data for the doctor is in this format
            { id: 'd1', name: 'Vegetables', image: yoga, description: 'Vitamins & fiber', examples: 'Broccoli, Spinach' },
            { id: 'd2', name: 'Whole grains', image: yoga, description: 'Rich in fiber', examples: 'Brown rice, Quinoa' },
            { id: 'd7', name: 'Fruits', image: yoga, description: 'Natural sugars', examples: 'Apples, Bananas' },
            { id: 'd8', name: 'Lean proteins', image: yoga, description: 'Muscle growth', examples: 'Chicken, Fish' },
          ];
    
          const prevSelectedTilesNotToEat = [
            // Assuming retrieved data for the doctor is in this format
            { id: 'd3', name: 'Sugary drinks', image: yoga, description: 'High sugar content', examples: 'Soda, Juices' },
            { id: 'd4', name: 'Processed foods', image: yoga, description: 'High in additives', examples: 'Fast food, Snacks' },
            { id: 'd5', name: 'High-fat foods', image: yoga, description: 'Contribute to health issues', examples: 'Fried foods, Creamy sauces' },
            { id: 'd6', name: 'Sodium-rich foods', image: yoga, description: 'May increase blood pressure', examples: 'Canned soups, Processed meats' },
          ];
    
          setFoodsToEat(prevSelectedTilesToEat);
          setFoodsNotToEat(prevSelectedTilesNotToEat);
        }
      }, [role, patientId]);
  
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
      }
    };

    const handleDoubleClick = (id) => {
        if (id === doubleClickedItem) {
          setDoubleClickedItem(null);
        } else {
          setDoubleClickedItem(id);
        }
    };
    
    const handleDelete = (id, toEat) => {
        // Logic to delete the item with the provided ID
        if (toEat) {
          const updatedFoodsToEat = foodsToEat.filter(item => item.id !== id);
          setFoodsToEat(updatedFoodsToEat);
        } else {
          const updatedFoodsNotToEat = foodsNotToEat.filter(item => item.id !== id);
          setFoodsNotToEat(updatedFoodsNotToEat);
        }
        setDoubleClickedItem(null); // Reset double-clicked item after deletion
    };

      const renderFoodItem = ({ item }) => (
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
            onPress={() => handleDelete(item.id, true)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

    
  
    const renderFoodList = (foods) => (
      <FlatList
        horizontal
        data={foods}
        keyExtractor={(item) => item.id}
        onLongPress={() => role === 'doctor' && handleDelete(item.id, false)}
        renderItem={renderFoodItem}
        showsHorizontalScrollIndicator={false}
      />
    );
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/fooddetails.png')} style={styles.image} />
        </View>
  
        {role === 'doctor' && (
          <View style={styles.inputContainer}>
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
              style={[styles.addButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => handleAddNewFood(true)}
            >
              <Text style={styles.addButtonText}>Add New Food to Eat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: '#FF5722' }]}
              onPress={() => handleAddNewFood(false)}
            >
              <Text style={styles.addButtonText}>Add New Food Not to Eat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditable(!editable)}
            >
              <Text style={styles.editButtonText}>
                {editable ? 'Done Editing' : 'Edit Foods'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
  
        <Text style={styles.sectionHeading}>What to Eat</Text>
        {renderFoodList(foodsToEat)}
  
        <Text style={styles.sectionHeading}>What Not to Eat</Text>
        {renderFoodList(foodsNotToEat)}
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

  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },

  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FoodDetails;
