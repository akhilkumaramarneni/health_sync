import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CartScreen = ({ route }) => {
    const [cartItems, setCartItems] = useState(route.params.items || []);

    const handleRemoveItem = (indexToRemove) => {
        const newItems = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(newItems);
    };

    return (
        <ScrollView>
            <View style={styles.tileContainer}>
                <Text style={styles.title}>Cart Items:</Text>
                {cartItems.map((item, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.tile} 
                      onPress={() => handleRemoveItem(index)}
                    >
                        <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'black', // Black text color for general text
  },
  item: {
    padding: 10,
    margin: 5,
    backgroundColor: '#eee',
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
    color: 'black', // Black text color for general text
    // ... other tile styles ...
  },
  text: {
    color: 'black', // Black text color for general text
  },
});

export default CartScreen;
