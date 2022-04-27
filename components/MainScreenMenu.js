import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  useFonts,
  Jost_700Bold_Italic,
  Jost_400Regular,
} from '@expo-google-fonts/dev';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalComponent from './ModalComponent';

function MainScreenMenu() {
  let [fontsLoaded] = useFonts({
    Jost_700Bold_Italic,
    Jost_400Regular,
  });

  const [toggleMenu, setToggleMenu] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const modalContent = (
    <>
      <Pressable
        style={[styles.modalClose]}
        onPress={() => {
          setToggleMenu(!toggleMenu);
        }}>
        <Ionicons name='close-circle' size={32} color='black' />
      </Pressable>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Preferences</Text>
          <Ionicons name='settings' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>View Matches</Text>
          <Ionicons name='checkmark-done-sharp' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Customize Shelf</Text>
          <MaterialCommunityIcons name='bookshelf' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Logout</Text>
          <MaterialCommunityIcons name='logout' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.menuContainer}>
      <ModalComponent content={modalContent} modalVisible={toggleMenu} />
      <TouchableOpacity
        style={styles.openMenuButton}
        onPress={() => setToggleMenu(!toggleMenu)}>
        <Text
          style={{
            fontFamily: 'Jost_700Bold_Italic',
            textAlign: 'center',
            fontSize: 28,
          }}>
          MENU
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  openMenuButton: {
    backgroundColor: '#31AFB4',
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '90%',
  },
  menuContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  menuButton: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#31AFB4',
    marginBottom: 10,
  },
  menuButtonText: {
    fontSize: 24,
    fontFamily: 'Jost_400Regular',
    paddingRight: 10,
  },
  modalClose: {
    right: 10,
    position: 'absolute',
    top: 20,
  },
});

export default MainScreenMenu;
