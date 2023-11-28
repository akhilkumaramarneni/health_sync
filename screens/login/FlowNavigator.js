import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROLES } from '../../constants'
import { useAuth } from '../../store/AuthContext';

// Import your login screen and other screens
import BiometricLogin from './BiometricLogin';
import ConsolidatedSessions from './ConsolidatedSessions';
import Notifications from './Notifications';
import QRCodeGenerator from './QRCodeGenerator';
import SessionsPreviousHistory from './SessionsPreviousHistory';
import SessionInfo from './SessionInfo';
import Scan from './Scan';
import FoodDetails from './FoodDetails';
import ExerciseDetails from './ExerciseDetails';
import MedicineDetails from './MedicineDetails';

import NewSession from './NewSession';
import CartScreen from './CartScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const FlowNavigator = () => {
    const { userType } = useAuth();

    return (

        <Stack.Navigator initialRouteName="BiometricLogin">
            <Stack.Screen name="BiometricLogin" component={BiometricLogin} />
            {
                userType == ROLES.PATIENT ? <Stack.Screen name="MainPatientNavigator" component={MainPatientNavigator} options={{ headerShown: false }} />
                    : <Stack.Screen name="MainDoctorNavigator" component={MainDoctorNavigator} options={{ headerShown: false }} />
            }

        </Stack.Navigator>
    );
};

function PatientSessionsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SessionsPreviousHistory" component={SessionsPreviousHistory} 
        options={{ drawerLabel: () => null, title: 'History' }} />
      <Stack.Screen name="SessionInfo" component={SessionInfo} options={{ drawerLabel: () => null, title :"Session Info" }} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} options={{ drawerLabel: () => null, title :"Food Details" }} initialParams={{ role: 'patient' }}/>
      <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} options={{ drawerLabel: () => null, title :"Exercise Details" }} initialParams={{ role: 'patient' }}/>
      <Stack.Screen name="MedicineDetails" component={MedicineDetails} options={{ drawerLabel: () => null, title :"Medicine Details" }} initialParams={{ role: 'patient' }}/>

      {/* Add other screens in the Sessions stack if needed */}
    </Stack.Navigator>
  );
}

const MainPatientNavigator = () => {
    // drawerContent={(props) => <CustomDrawer {...props} />} use this to cusotmize drawer
    return (
        <Drawer.Navigator initialRouteName="MainPatientNavigator" >
            <Drawer.Screen name="ConsolidatedSessions" component={ConsolidatedSessions}
                options={{title:'Overview' }} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="QR Code" component={QRCodeGenerator} />
            <Stack.Screen 
              name="PatientSessionsStackNavigator" 
              component={PatientSessionsStackNavigator} 
              options={{ title: 'History' }} 
            />
        </Drawer.Navigator>
    );
};

function DoctorSessionsStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="SessionsPreviousHistory" 
          component={SessionsPreviousHistory} 
        />
        <Stack.Screen 
          name="New Session" 
          component={NewSession} 
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
        />
        <Stack.Screen 
          name="SessionInfo" 
          component={SessionInfo} 
          options={{ drawerLabel: () => null, 
          title :"Session Info" }} 
        />
        <Stack.Screen 
          name="FoodDetails" 
          component={FoodDetails} 
          options={{ drawerLabel: () => null, title :"Food Details" }} 
          initialParams={{ role: 'doctor' }}
        />
        <Stack.Screen 
          name="ExerciseDetails" 
          component={ExerciseDetails} 
          options={{ drawerLabel: () => null, title :"Exercise Details" }} 
          initialParams={{ role: 'doctor' }}
        />
        <Stack.Screen 
          name="MedicineDetails" 
          component={MedicineDetails} 
          options={{ drawerLabel: () => null, title :"Medicine Details" }} 
          initialParams={{ role: 'doctor' }}
        />

        {/* Add other screens in the Sessions stack if needed */}
      </Stack.Navigator>
    );
  }
  
  const MainDoctorNavigator = () => {
    return (
      <Tab.Navigator initialRouteName="MainDoctorNavigator" tabBarOptions={{
        style: {
          borderColor: 'red', // Remove top border for a cleaner look
        },
      }}>
        <Tab.Screen name="Scan" component={Scan} />
        <Tab.Screen 
          name="SessionsPreviousHistory" 
          component={DoctorSessionsStackNavigator} 
          options={{ title: 'History' }} 
        />
        <Tab.Screen name="FoodDetails" component={FoodDetails} options={{ tabBarIcon : () => null, tabBarLabel: () => null }} initialParams={{ role: 'doctor' }}/>
        <Tab.Screen name="ExerciseDetails" component={ExerciseDetails} options={{ tabBarIcon : () => null, tabBarLabel: () => null }} initialParams={{ role: 'doctor' }}/>
        <Tab.Screen name="MedicineDetails" component={MedicineDetails} options={{ tabBarIcon : () => null, tabBarLabel: () => null }} initialParams={{ role: 'doctor' }}/>
        {/* Add other tabs as needed */}
      </Tab.Navigator>
    );
  };

export default FlowNavigator;