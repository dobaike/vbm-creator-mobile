import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CommandCenterScreen from './src/screens/CommandCenterScreen';
import BiometricPassScreen from './src/screens/BiometricPassScreen';
import UploadScreen from './src/screens/UploadScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#0b0f19" />
        <Stack.Navigator 
          initialRouteName="CommandCenter"
          screenOptions={{
            headerStyle: { backgroundColor: '#0b0f19' },
            headerTintColor: '#ffffff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen 
            name="CommandCenter" 
            component={CommandCenterScreen} 
            options={{ title: 'VBM Creator Command Center' }} 
          />
          <Stack.Screen 
            name="BiometricPass" 
            component={BiometricPassScreen} 
            options={{ title: 'Masterclass Access Pass' }} 
          />
          <Stack.Screen 
            name="Upload" 
            component={UploadScreen} 
            options={{ title: 'Vault Chunked Ingest' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
