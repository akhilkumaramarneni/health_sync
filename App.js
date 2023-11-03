import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './store/AuthContext'; 
import FlowNavigator from './screens/login/FlowNavigator'; 

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <FlowNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}