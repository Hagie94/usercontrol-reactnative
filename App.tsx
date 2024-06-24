
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import connexion from './connexion';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type SectionProps = PropsWithChildren<{
  title: string;
}>;




function App(): React.JSX.Element {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Connexion'>
        <Stack.Screen name='UserControl' component={connexion}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
