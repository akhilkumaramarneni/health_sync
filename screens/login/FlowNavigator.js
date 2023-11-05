import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROLES } from '../../constants'
import { useAuth } from '../../store/AuthContext';

// Import your login screen and other screens
import BiometricLogin from './BiometricLogin';
import Sessions from './Sessions';
import Notifications from './Notifications';
import QRCodeGenerator from './QRCodeGenerator';
import Scan from './Scan';


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
            <Drawer.Screen name="Sessions" component={Sessions} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="QR Code" component={QRCodeGenerator} />
        </Drawer.Navigator>
    );
};

const MainDoctorNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="MainDoctorNavigator" >
            <Drawer.Screen name="Scan" component={Scan} />
        </Tab.Navigator>
    );
};

export default FlowNavigator;