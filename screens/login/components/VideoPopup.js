import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoPopup = ({ videoURL, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={styles.videoContainer}>
          <Video
            source={videoURL }
            style={styles.videoPlayer}
            controls={true}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  videoContainer: {
    width: '95%',
    aspectRatio: 16 / 9,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoPlayer: {
    flex: 1,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default VideoPopup;