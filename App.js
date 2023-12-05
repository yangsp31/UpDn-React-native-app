import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import TextScreen from './screens/TextScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="TextScreen"
        component={TextScreen}
        options={{ title: '주의 사항' }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeStack') {
              iconName = require('./assets/home.png');
            } else if (route.name === 'Search') {
              iconName = require('./assets/search.png');
            }
      
            return <Image source={iconName} style={{ width: size, height: size }} />;
          },
          tabBarActiveTintColor: 'black', 
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { 
            display: 'flex'
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: 'Home' }} 
        />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}