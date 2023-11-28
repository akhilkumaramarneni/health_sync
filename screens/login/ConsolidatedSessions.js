import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
const headerImage = '../../assets/images/uicon.png';
const notification = require('../../assets/images/Notification.png');
const banner = require('../../assets/images/bg2.png');
const fire = require('../../assets/images/fire.png');
const model = require('../../assets/images/upcoming_sessions.png');
const couple = require('../../assets/images/prev_sessions.png');
const cycle = require('../../assets/images/cycle.png');
const yoga = require('../../assets/images/yoga.png');
const walk = require('../../assets/images/walk.png');
const next = require('../../assets/images/next.png');
const play = require('../../assets/images/play.png');
const star = require('../../assets/images/Star.png');
const book = require('../../assets/images/Book.png');
const home = require('../../assets/images/Home.png');
const heart = require('../../assets/images/H.png');
const calendar = require('../../assets/images/Calender.png');
const profile = require('../../assets/images/User.png');
const plus = require('../../assets/images/Plus.png');
const medicine = require('../../assets/images/medicine.png');
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../store/AuthContext';

const ConsolidatedSessions = () => {
  const navigation = useNavigation();
  navigateToAllSessions = ()=>{
    navigation.navigate('PatientSessionsStackNavigator');
  }
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.screen}>
          <Header />
          <Banner />
        </View>
        <View style={{marginHorizontal: '3%'}}>
        <Label>Upcoming Medicines</Label>
          <View style={{flexDirection: 'row', marginBottom:10}}>
            {medicinedata.map((item, index) => (
              <MedicineCard data={item} index={index} />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label>Previous Sessions</Label>
            <TouchableOpacity onPress={()=>navigateToAllSessions()}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                opacity: 0.5,
                fontSize: 12,
              }}>
              View All
            </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginBottom:20}}>
            {data.map((item, index) => (
              <VideoPlay index={index} />
            ))}
          </View>
          <Label>Excercise Activity</Label>
          <View style={{flexDirection: 'row', marginBottom:20}}>
            {data.map((item, index) => (
              <Card data={item} index={index} />
            ))}
          </View>
        </View>
      </ScrollView>
      {/* <BottomTab /> */}
    </>
  );
};

export default ConsolidatedSessions;

const BottomTab = () => (
  <View
    style={{
      position: 'absolute',
      bottom: 10,
      margin: 10,
      marginHorizontal: 25,
      borderRadius: 20,
      padding: 10,
      // width: '100%',
      backgroundColor: '#EDEDED',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <BottomButton image={home} />
    <BottomButton image={heart} />
    <BottomButton
      image={plus}
      style={{
        position: 'absolute',
        left: '43%',
        top: -25,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 20,
      }}
    />
    <BottomButton />
    <BottomButton image={calendar} />
    <BottomButton image={profile} />
  </View>
);
const BottomButton = ({image, style, imageStyle}) => (
  <>
    <View
      style={[
        {
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Image
        source={image}
        style={[
          {
            height: image === plus ? 40 : 20,
            width: image === plus ? 40 : 20,
          },
          imageStyle,
        ]}
      />
    </View>
    {image === home && (
      <View
        style={{
          width: '10%',
          position: 'absolute',
          height: 2,
          backgroundColor: '#8860a2',
          bottom: 0,
          left: 25,
        }}
      />
    )}
  </>
);

const VideoPlay = () => (
  <View
    style={{
      borderRadius: 15,
      marginHorizontal: 12,
      shadowOffset: {width: -5, height: 3},
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 3,
      backgroundColor: '#fff',
    }}>
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <ImageBackground
        source={couple}
        style={{
          height: 150,
          width: 300,
        }}>
        <LinearGradient
          locations={[0, 1.0]}
          colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.60)']}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}></LinearGradient>
      </ImageBackground>
      <Text
        style={{
          position: 'absolute',
          bottom: 5,
          left: 10,
          fontFamily: 'Poppins-Regular',
          color: '#fff',
        }}>
        Diabetes
      </Text>
      {/* <View
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          padding: 5,
          right: 10,
          top: 10,
          borderRadius: 5,
        }}>
        <Image source={star} style={{height: 10, width: 10}} />
      </View> */}
    </View>
    <View
      style={{
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
      }}>
      {/* <View
        style={{
          position: 'absolute',
          backgroundColor: '#8860a2',
          padding: 10,
          right: 25,
          top: -15,
          borderRadius: 15,
          zIndex: 3,
        }}>
        <Image source={play} style={{height: 10, width: 10}} />
      </View> */}
      <Text style={{fontFamily: 'Poppins-Regular'}}>
        Summary of Session
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color: '#8860a2',
          }}>
          45 Min
        </Text>
      </View>
    </View>
  </View>
);

const Card = ({data, index}) => {
  let status = data.status/100;
  return (
    <View
      style={{
        flex: 1,
        height: index === 1 ? 180 : 150,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: data.color,
        justifyContent: 'space-between',
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: {width: -5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}>
      <Image source={data.image} style={{height: 25, width: 25}} />
      <View style={{alignSelf: 'center', margin: 5}}>
        <Progress.Pie
          size={50}
          progress={status}
          showsText
          unfilledColor="#ededed"
          borderColor="#ededed"
          color={data.darkColor}
          direction="counter-clockwise"
          fill="white"
          strokeCap="round"
          thickness={5}
          style={{
            shadowColor: 'grey',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 1,
          }}
          textStyle={{
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            fontWeight: 'bold',
          }}
        />
      </View>
      <View>
        <Text style={{fontSize: 10, fontFamily: 'Poppins-Light'}}>
          {`Day     ${data.day}`}
        </Text>
        <Text style={{fontSize: 10, fontFamily: 'Poppins-Light'}}>
          {`Time   ${data.time}`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontFamily: 'Poppins-Regular'}}>{data.name}</Text>
        <View
          style={{
            backgroundColor: data.lightColor,
            padding: 2,
            borderRadius: 10,
          }}>
          <Image
            source={next}
            style={{
              height: 12,
              width: 12,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const MedicineCard = ({ data }) => {
  return (
    <View
      style={{
        flex: 1,
        height: 150, // Set a consistent height for all cards
        padding: 10,
        alignSelf: 'center',
        backgroundColor: data.color,
        justifyContent: 'space-between',
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: {width: -5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}>
      
      {/* Image in the middle of the card */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={data.image} style={{ height: 50, width: 50 }} />
      </View>

      {/* Details at the bottom of the card */}
      <View>
        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light' }}>
          {`Usage: ${data.usage}`} {/* Changed from data.day to data.usage */}
        </Text>
      </View>
      
      {/* Footer section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontFamily: 'Poppins-Regular' }}>{data.name}</Text>
      </View>
    </View>
  );
};
const Header = () => (
  <View style={styles.header}>
    <ImageContainer image={require(`${headerImage}`)} />
    <HeaderTitle />
    <ImageContainer image={notification} height={'50%'} width={'50%'} />
  </View>
);
const Banner = () => (
  <>
    <ImageBackground style={styles.banner} source={banner}>
      <View style={styles.bannerContainer}>
        <View style={styles.rowLabel}>
          <View style={styles.fireContainer}>
            <Image
              source={fire}
              resizeMode="contain"
              style={styles.fireImage}
            />
          </View>
          <Text style={{...styles.offer, color: 'black'}}>Upcoming meeting</Text>
        </View>
        <OfferText >Check up with Dr. Jhon</OfferText>
        <OfferText >Wednesday 10 am at UF</OfferText>
      </View>
    </ImageBackground>
    {/* <Image source={model} style={styles.model} resizeMode="contain" /> */}
  </>
);

const OfferText = ({children}) => (
  <Text style={styles.offerText}>{children}</Text>
);

const ImageContainer = ({image, height = '100%', width = '100%'}) => (
  <View style={styles.imageContainer}>
    <Image source={image} style={[{height, width}]} />
  </View>
);
const HeaderTitle = () => {

  const { loggedInUserName, } = useAuth();
  // Get the current date and time
  const now = new Date();
  const currentTime = now.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
  });

  return (
    <View style={styles.title}>
      <Text style={styles.bigTitle}>Hi, {loggedInUserName && loggedInUserName.trim() !== '' ? loggedInUserName : 'Jane'}! </Text>
      {/* Replace "Aug 12, 2021" with the current time */}
      <Text style={styles.smallTitle}>{currentTime}</Text>
    </View>
  );
};
const Label = ({children}) => <Text style={styles.label}>{children}</Text>;
const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {paddingHorizontal: 10, flex: 1, justifyContent: 'center'},
  bigTitle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
  smallTitle: {fontSize: 10, fontFamily: 'Poppins-Regular', opacity: 0.6},
  image: {height: '100%', width: '100%'},
  fireImage: {height: 15, width: 15, alignSelf: 'center', margin: 5},
  banner: {
    marginTop: 20,
    padding: 30,
    resizeMode: 'contain',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  bannerContainer: {flex: 1},
  label: {fontFamily: 'Poppins-Medium', fontSize: 20, marginVertical: 10},
  model: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 10,
    height: '75%',
    width: '50%',
    transform: [{rotateY: '180deg'}],
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {margin: '3%'},
  offer: {color: 'white', fontFamily: 'Poppins-Regular', fontSize: 10},
  offerText: {color: 'black', fontSize: 16, fontFamily: 'Poppins-Regular'},

  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const data = [
  {
    name: 'Cycling',
    status: 85,
    image: cycle,
    lightColor: '#f8e4d9',
    color: '#fcf1ea',
    darkColor: '#fac5a4',
    day : 2,
    time : "1hr 35 min"
  },
  {
    name: 'Walking',
    status: 25,
    image: walk,
    lightColor: '#d7f0f7',
    color: '#e8f7fc',
    darkColor: '#aceafc',
    day : 5,
    time : "1 hr"
  },
  {
    name: 'Yoga',
    status: 85,
    image: yoga,
    lightColor: '#dad5fe',
    color: '#e7e3ff',
    darkColor: '#8860a2',
    day : 6,
    time :"2 hr 35 mins"
  },
];

const medicinedata = [
  {
    name: 'Tylenol',
    status: 85,
    image: medicine,
    lightColor: '#f8e4d9',
    color: '#ADE3F3',
    darkColor: '#fac5a4',
    usage : 'Once at Night',
    // time : "1hr 35 min"
  },
  {
    name: 'Azithromicin',
    status: 25,
    image: medicine,
    lightColor: '#d7f0f7',
    color: '#ADE3F3',
    darkColor: '#aceafc',
    usage : 'Twice a Day',
    // time : "1 hr"
  },
];