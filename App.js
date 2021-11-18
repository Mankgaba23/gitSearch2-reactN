import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import searchUser from './components/searchUser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import repos from './components/repos';
import ResultsNotFound from './components/ResultsNotFound';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SearchUser" component={searchUser} options={{ headerShown: false }} />
        <Stack.Screen name="repos" component={repos} />
        < Stack.Screen name="resultnotfound" component={ResultsNotFound} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
