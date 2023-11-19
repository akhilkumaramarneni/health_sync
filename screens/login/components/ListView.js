import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';

const yoga = require('../../../assets/images/yoga.png');

const ListView = ({item, viewItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        viewItem(item);
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={yoga}
          />
        </View>
        <View>
          <Text style={styles.title}>{item.doctorname}</Text>
          <Text style={styles.subtitle}>${item.visittime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  //
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'green'
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#303540',
  },
});

export default ListView;