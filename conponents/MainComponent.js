import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();
const ContactStack = createStackNavigator();
const AboutStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
        headerShown: true // ✅ giữ header của Stack
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

function MenuStackScreen() {
  return (
    <MenuStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
        headerShown: true // ✅ giữ header của Stack để có màu
      }}
    >
      <MenuStack.Screen name="Menu" component={Menu} />
      <MenuStack.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ title: 'Dish Detail' }} // ✅ đặt tiêu đề riêng
      />
    </MenuStack.Navigator>
  );
}



function ContactStackScreen() {
  return (
    <ContactStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
        headerShown: true // ✅ giữ header của Stack
      }}
    >
      <ContactStack.Screen
        name="Contact"
        component={Contact}
        options={{ title: 'Contact Us' }} // ✅ đặt tiêu đề
      />
    </ContactStack.Navigator>
  );
}

function AboutStackScreen() {
  return (
    <AboutStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
        headerShown: true // ✅ giữ header của Stack
      }}
    >
      <AboutStack.Screen
        name="About"
        component={About}
        options={{ title: 'About Us' }} // ✅ đặt tiêu đề
      />
    </AboutStack.Navigator>
  );
}


const Main = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ headerShown: false }} // ✅ ẩn header của Drawer
        />
        <Drawer.Screen
          name="About Us"
          component={AboutStackScreen}
          options={{ headerShown: false }} // ✅ ẩn header của Drawer
        />
        <Drawer.Screen
          name="Menu"
          component={MenuStackScreen}
          options={{ headerShown: false }} // ✅ ẩn header của Drawer
        />
        <Drawer.Screen
          name="Contact Us"
          component={ContactStackScreen}
          options={{ headerShown: false }} // ✅ ẩn header của Drawer
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Main;