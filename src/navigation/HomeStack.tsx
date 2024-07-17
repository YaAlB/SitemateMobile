import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import ImageListScreen from '../screens/ImageListScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="ImageList" component={ImageListScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
