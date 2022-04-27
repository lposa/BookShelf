import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  ClickerScript_400Regular,
  Jost_700Bold_Italic,
} from '@expo-google-fonts/dev';
import Shelf from '../components/Shelf';
import QuickActions from '../components/QuickActions';
import MainScreenMenu from '../components/MainScreenMenu';

function Main() {
  let [fontsLoaded] = useFonts({
    ClickerScript_400Regular,
    Jost_700Bold_Italic,
  });
  const [userShelf, setUserShelf] = useState([]);
  const userShelfData = require('../database/userShelf');

  useEffect(() => {
    setUserShelf(userShelfData.userShelf);
    console.log(userShelf);
    console.log('User shelf has been updated! useEffect in progres...');
  }, [userShelf]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.userName}>
          <Text style={styles.userNameText}>Leonards Shelf</Text>
        </View>
        <View style={styles.shelfContainer}>
          <Shelf userShelf={userShelf} setUserShelf={setUserShelf} />
        </View>
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsText}>QUICK ACTIONS</Text>
          <QuickActions setUserShelf={setUserShelf} />
        </View>
        <View style={styles.menuContainer}>
          <MainScreenMenu />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  userName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  userNameText: {
    fontSize: 52,
    fontFamily: 'ClickerScript_400Regular',
  },
  quickActionsContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  quickActionsText: {
    fontSize: 32,
    fontFamily: 'Jost_700Bold_Italic',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
  },
  shelfContainer: {
    position: 'relative',
  },
});

export default Main;
