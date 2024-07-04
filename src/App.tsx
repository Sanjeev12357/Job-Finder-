import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, icons, images } from './constants';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import { ScreenHeaderBtn } from './components';
import Search from './pages/Search';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: COLORS.lightWhite,
            },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%'  />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
            )
          }}
        />
        <Stack.Screen
          name="JobDetails"
         
          component={JobDetails}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: COLORS.lightWhite
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerLeft: ({}) => (
              <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => navigation.goBack()} />
            ),
            headerRight: ({}) => (
              <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' handlePress={() => navigation.goBack()} />
            ),
            headerBackVisible: false,
            headerTitle:''
          })}
        />
        <Stack.Screen
        name="Search"
        component={Search}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: ({}) => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => navigation.goBack()} />
          ),
          
          headerBackVisible: false,
          headerTitle:''
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
