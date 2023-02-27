import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const RootStack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const StartScreen = () => <View />;

const Screen = () => {
  const headerHeight = useHeaderHeight();
  console.log(headerHeight);
  return (
    <View style={styles.screen}>
      <StatusBar />
      <Text>Content</Text>
    </View>
  );
};

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: 'red',
  },
  headerTitleAlign: 'center',
  animation: 'slide_from_right',
  gestureEnabled: false,
  orientation: 'portrait_up',
};

const defaultTabBarStyle = {
  tabBarStyle: {height: 100, backgroundColor: 'red'},
};

const BottomStack = () => (
  <Stack.Navigator screenOptions={defaultStackOptions}>
    <Stack.Screen name="stack" options={{title: 'Header'}} component={Screen} />
  </Stack.Navigator>
);

const TopTab = () => (
  <Tab.Navigator screenOptions={defaultTabBarStyle} tabBarPosition="bottom">
    <Tab.Screen name="tab" component={BottomStack} />
  </Tab.Navigator>
);

const App = () => {
  const [showStart, setShowStart] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowStart(false);
    }, 500);
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName=""
        screenOptions={{headerShown: false}}>
        {showStart ? (
          <RootStack.Screen name="start" component={StartScreen} />
        ) : (
          <RootStack.Screen name="root" component={TopTab} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
