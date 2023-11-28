import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../store/AuthContext';

const CartScreen = ({ route }) => {
    const [cartItems, setCartItems] = useState(route.params.items || []);
    const { loggedInUserName, allFoodData, allExcerciseData, allMedicineData } = useAuth();


    const handleRemoveItem = (indexToRemove) => {
        const newItems = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(newItems);
    };

    const sendDataToServer = () => {
        console.log("send data to server");
        const currentTime = new Date();
        // Formatting the date and time as a string (e.g., "2023-03-21T10:30:15")
        const visitTime = currentTime.toISOString();

       let complexTiles = []
       if(allFoodData)complexTiles.push(allFoodData[0]) 
       if(allExcerciseData)complexTiles.push(allExcerciseData[0])
       if(allMedicineData)complexTiles.push(allMedicineData[0])

       console.log("all data ", complexTiles)

        const prescriptionData = {
            doctor: "fucker",
            patient: "patient1",
            disease: "", 
            visitTime: visitTime, // assuming you have a way to set these
            simpletiles: cartItems.filter(item => item.flag === 'simple').map(item => item.text),
            complextiles:  complexTiles
        };

        console.log("Send data to server:", JSON.stringify(prescriptionData));
        const prescriptionDataJson = JSON.stringify(prescriptionData);
        const apiEndpoint = 'https://traficml.uc.r.appspot.com/upload-session';
            fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: prescriptionDataJson,
            })
            .then(response => {
                console.log("api call", response)
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`HTTP error! status: ${response.status}, Body: ${text}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Handle the response data
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors
            });


        // fetch(apiEndpoint, {
        //     method: 'GET', // GET is the default method, so this line is optional
        //     })
        //     .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok ' + response.statusText);
        //     }
        //     console.log('response ' + response.json());
        //     console.log(JSON.stringify(response));
        //     })
        //     .then(data => {
        //     console.log('data ' + data);
        //     // Process the data
        //     })
        //     .catch(error => {
        //     console.error('Fetch error:', error);
        //     });

        
    };

    console.log("all data food", allFoodData, allExcerciseData, allMedicineData)
    

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
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
                    
                    {
                        allFoodData ? <TouchableOpacity 
                        style={styles.tile} 
                    >
                        <Text style={styles.text}>Food</Text>
                        </TouchableOpacity> : null
                    }
                                {
                        allExcerciseData ? <TouchableOpacity 
                        style={styles.tile} 
                    >
                        <Text style={styles.text}>Exercise</Text>
                        </TouchableOpacity> : null
                    }
                                {
                        allMedicineData ? <TouchableOpacity 
                        style={styles.tile} 
                    >
                        <Text style={styles.text}>Medicine</Text>
                        </TouchableOpacity> : null
                    }
                </View>
            </ScrollView>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => sendDataToServer()}
            >
                <Text style={styles.buttonText}>Send Prescription</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollView: {
        flex: 1,
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
  button: {
    backgroundColor: '#007ACC', // Button background color
    padding: 15, // Button padding
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    width: '100%', // Make the button extend full width
    borderRadius: 5, // Rounded corners
  },
});

export default CartScreen;
