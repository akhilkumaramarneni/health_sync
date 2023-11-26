import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, TextInput, } from 'react-native';
import VideoPopup from '../login/components/VideoPopup';

const ExerciseDetails = ({ route }) => {
  const { role } = route.params;
  const [selectedVideo, setSelectedVideo] = useState(null);

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

  const [exercises, setExercises] = useState([
    {
      id: '1',
      name: 'Stretching',
      description: 'Stretch your body',
      duration: '10 minutes',
      videoURL: require('../../assets/videos/stretching.mp4'),
    },
    {
      id: '2',
      name: 'Aerobics',
      description: 'Improve cardiovascular health',
      duration: '20 minutes',
      videoURL: require('../../assets/videos/cycling.mp4'),
    },
    // Add more exercise items as needed
  ]);


  const createExercise = () => {
    const newExercise = {
      id: `${Math.random().toString(36).substring(7)}`,
      name: exerciseName,
      description: exerciseDesc,
      duration: exerciseDuration,
      videoURL: require('../../assets/videos/stretching.mp4'),
    };

    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setExerciseDesc('');
    setExerciseDuration('');
    setExerciseUrl('');
  };

  const deleteExercise = (id) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
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
       <Image source={require('../../assets/images/yoga.png')} style={styles.exerciseImage} />
       <Text style={styles.exerciseName}>{item.name}</Text>
       <Text style={styles.exerciseDescription}>{item.description}</Text>
       <Text style={styles.exerciseDuration}>{item.duration}</Text>
       {role === 'doctor' && (
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteExercise(item.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
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


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {role === 'doctor' && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Exercise Name"
            value={exerciseName}
            onChangeText={(text) => setExerciseName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Exercise Description"
            value={exerciseDesc}
            onChangeText={(text) => setExerciseDesc(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration"
            value={exerciseDuration}
            onChangeText={(text) => setExerciseDuration(text)}
          />
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
      {selectedVideo && (
        <VideoPopup videoURL={selectedVideo} onClose={closeVideoPopup} />
      )}
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
    marginBottom: 15,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#F8DCE1',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    fontWeight: 'bold',
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
    backgroundColor: '#F8DCE1',
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
    color: '#333333',
  },
  exerciseDescription: {
    color: '#666666',
  },
  exerciseDuration: {
    color: '#666666',
    marginBottom: 5,
  },
  playButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F8DCE1',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
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
});

export default ExerciseDetails;
