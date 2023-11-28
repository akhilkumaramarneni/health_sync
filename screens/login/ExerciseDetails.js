import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, TextInput, } from 'react-native';
import VideoPopup from '../login/components/VideoPopup';
import { saveDetails } from '../../store/Details';
import Modal from 'react-native-modal';

const ExerciseDetails = ({ route }) => {
  const { role } = route.params;
  const { data } = route.params;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (data && data.complextiles && data.complextiles.length > 0) {
      const exerciseTiles = data.complextiles.find(tile => tile.type === 'excercise');

      if (exerciseTiles && exerciseTiles.todo && exerciseTiles.todo.length > 0) {
        const parsedExercises = exerciseTiles.todo.map(exercise => ({
          id: Math.random().toString(36).substring(7),
          name: exercise.type,
          description: exercise.description,
          videoURL: require(`../../assets/videos/stretching.mp4`),
          // videoURL: require(`../../assets/videos/${exercise.type.toLowerCase()}.mp4`),
        }));
        setExercises(parsedExercises);
      }
    }
  }, [data]);

  const openVideoPopup = (videoURL) => {
    setSelectedVideo(videoURL);
  };

  const closeVideoPopup = () => {
    setSelectedVideo(null);
  };

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDesc, setExerciseDesc] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [exerciseUrl, setExerciseUrl] = useState('');


  const createExercise = () => {
    const newExercise = {
      id: `${Math.random().toString(36).substring(7)}`,
      name: exerciseName,
      description: exerciseDesc,
      // duration: exerciseDuration,
      videoURL: require('../../assets/videos/running.mp4'),
    };

    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setExerciseDesc('');
    // setExerciseDuration('');
    setExerciseUrl('');

    saveUpdatedData();
  };

  const deleteExercise = (id) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);

    saveUpdatedData();
  };

  const renderExerciseList = () => (
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id}
      renderItem={renderExerciseItem}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderExerciseItem = (item) => {
    return (
      <TouchableOpacity style={styles.exerciseCard}>
       {/* Display exercise information */}
       <Image source={require('../../assets/images/exerciseDetail.png')} style={styles.exerciseImage} />
       <Text style={styles.exerciseName}>{item.name}</Text>
       <Text style={styles.exerciseDescription}>{item.description}</Text>
       {/* <Text style={styles.exerciseDuration}>{item.duration}</Text> */}
       {role === 'doctor' && (
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteExercise(item.id)}>
            <Text style={styles.deleteButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => openVideoPopup(item.videoURL)}
        >
          <Text style={styles.playButtonText}>▶️</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const submitDetails = () => {
    saveUpdatedData();
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 900);
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const saveUpdatedData = () => {
    const updatedExerciseTiles = {
        type: 'excercise',
        todo: exercises.map((exercise) => ({
            type: exercise.name,
            description: exercise.description,
        })),
    };

    let updatedData = { complextiles: [] }; // Initialize with an empty complextiles array if 'data' is undefined or null
    if (data && data.complextiles) {
        updatedData = { ...data };
    }

    const foundIndex = updatedData.complextiles.findIndex((tile) => tile.type === 'excercise');
    if (foundIndex !== -1) {
        updatedData.complextiles[foundIndex].todo = updatedExerciseTiles.todo;
    } else {
        updatedData.complextiles.push(updatedExerciseTiles);
    }

    saveDetails(updatedData.complextiles);
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {role === 'doctor' && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Exercise Name"
              placeholderTextColor="#ffffff"
              value={exerciseName}
              onChangeText={(text) => setExerciseName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Exercise Description"
              placeholderTextColor="#ffffff"
              value={exerciseDesc}
              onChangeText={(text) => setExerciseDesc(text)}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Duration"
              value={exerciseDuration}
              onChangeText={(text) => setExerciseDuration(text)}
            /> */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => createExercise()}
            >
              <Text style={styles.addButtonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
        )}

        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseItem}>
            {renderExerciseItem(exercise)}
          </View>
        ))}

        {/* Display video popup when 'selectedVideo' is not null */}
        {selectedVideo && (
          <VideoPopup videoURL={selectedVideo} onClose={closeVideoPopup} />
        )}

        {/* Display video popup when 'selectedVideo' is not null */}
        {/* {selectedVideo && (
          <VideoPopup videoURL={selectedVideo} onClose={closeVideoPopup} />
        )} */}
        
      </ScrollView>
      {role === 'doctor' && (
          <TouchableOpacity style={styles.submitButton} onPress={submitDetails}>
            <Text style={styles.submitButtonText}>Submit Details</Text>
          </TouchableOpacity>
      )}
      <Modal isVisible={showSuccessMessage} style={styles.modal}>
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Exercise Details successfully submitted!</Text>
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
    marginBottom: 15,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#3498db',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  exerciseCard: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#3498db',
  },
  exerciseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  exerciseDescription: {
    color: '#fff',
  },
  exerciseDuration: {
    color: '#fff',
    marginBottom: 5,
  },
  playButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    color: "#fff"
  },
  playButtonText: {
    color: '#36013F',
    fontSize: 35,
    fontWeight: 'bold',
  },
  addButton: {
    marginBottom: 0.1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#32a85f',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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

export default ExerciseDetails;
