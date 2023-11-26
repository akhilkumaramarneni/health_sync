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

const MainPatientNavigator = () => {
    // drawerContent={(props) => <CustomDrawer {...props} />} use this to cusotmize drawer
    return (
        <Drawer.Navigator initialRouteName="MainPatientNavigator" >
            <Drawer.Screen name="ConsolidatedSessions" component={ConsolidatedSessions}
                options={{ drawerLabel: () => null, title:'Overview' }} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="QR Code" component={QRCodeGenerator} />
            <Drawer.Screen name="SessionsPreviousHistory" component={SessionsPreviousHistory} 
            options={{ drawerLabel: () => null, title: 'History' }} />
            <Drawer.Screen name="SessionInfo" component={SessionInfo} options={{ drawerLabel: () => null, title :"Session Info" }} />
        </Drawer.Navigator>
    );
};

function SessionsStackNavigator() {
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
        {/* Add other screens in the Sessions stack if needed */}
      </Stack.Navigator>
    );
  }
  
  const MainDoctorNavigator = () => {
    return (
      <Tab.Navigator initialRouteName="MainDoctorNavigator">
        <Tab.Screen name="Scan" component={Scan} />
        <Tab.Screen 
          name="SessionsPreviousHistory" 
          component={SessionsStackNavigator} 
          options={{ title: 'History' }} 
        />
        {/* Add other tabs as needed */}
      </Tab.Navigator>
    );
  };

export default FlowNavigator;