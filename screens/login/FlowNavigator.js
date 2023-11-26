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
            <Drawer.Screen name="FoodDetails" component={FoodDetails} options={{ drawerLabel: () => null, title :"Food Details" }} initialParams={{ role: 'patient' }}/>
            <Drawer.Screen name="ExerciseDetails" component={ExerciseDetails} options={{ drawerLabel: () => null, title :"Exercise Details" }} initialParams={{ role: 'patient' }}/>
        </Drawer.Navigator>
    );
};

const MainDoctorNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="MainDoctorNavigator" >
            <Drawer.Screen name="Scan" component={Scan} />
            <Drawer.Screen name="SessionsPreviousHistory" component={SessionsPreviousHistory} 
             options={{title: 'History' }} />
            <Drawer.Screen name="FoodDetails" component={FoodDetails} options={{ drawerLabel: () => null, title :"Food Details" }} initialParams={{ role: 'doctor' }}/>
            <Drawer.Screen name="ExerciseDetails" component={ExerciseDetails} options={{ drawerLabel: () => null, title :"Exercise Details" }} initialParams={{ role: 'doctor' }}/>
        </Tab.Navigator>
    );
};

export default FlowNavigator;