import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import { useFonts, Jost_700Bold_Italic } from '@expo-google-fonts/dev';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import { searchBook } from '../services/booksService';
import Card from '../components/Card';
import ModalComponent from './ModalComponent';
import Toast from 'react-native-toast-message';
import { searchMusicAlbum } from '../services/musicService';
import TrophiesBubbles from './TrophiesBubbles';

function QuickActions({ setUserShelf }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [whichModal, setWhichModal] = useState();
  const [text, onChangeText] = useState('');
  const [musicSearchText, onMusicTextChange] = useState('');
  const [bookSearchResults, setBookSearchResults] = useState([]);
  const [musicSearchResults, setMusicSearchResults] = useState();
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [showMusicSearch, setShowMusicSearch] = useState(false);

  let [fontsLoaded] = useFonts({
    Jost_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function toggleModal(id) {
    setWhichModal(id);
    setModalVisible(true);
  }

  const addToShelfContent = (
    <>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeader}>SEARCH</Text>

        <View style={styles.bubbleWrapper}>
          <Pressable
            style={styles.bubbleContainer}
            onPress={() => {
              setShowBookSearch(!showBookSearch);
              setShowMusicSearch(false);
            }}>
            <Text style={{ fontSize: 20, fontFamily: 'Jost_700Bold_Italic' }}>
              Books
            </Text>
          </Pressable>
          <Pressable
            style={styles.bubbleContainer}
            onPress={() => {
              setShowMusicSearch(!showMusicSearch);
              setShowBookSearch(false);
            }}>
            <Text style={{ fontSize: 20, fontFamily: 'Jost_700Bold_Italic' }}>
              Music
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.modalClose]}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Ionicons name='close-circle' size={32} color='black' />
        </Pressable>

        {showBookSearch && (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder='Search book by title'
            />
            <Pressable
              onPress={() => {
                onSubmitBook(text);
              }}
              style={styles.searchButton}>
              <Ionicons name='search' size={24} color='black' />
            </Pressable>
          </View>
        )}

        {showMusicSearch && (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onMusicTextChange}
              value={musicSearchText}
              placeholder='Search music album'
            />
            <Pressable
              onPress={() => {
                onSubmitMusic(musicSearchText);
              }}
              style={styles.searchButton}>
              <Ionicons name='search' size={24} color='black' />
            </Pressable>
          </View>
        )}

        {showBookSearch && (
          <View style={styles.searchItems}>
            {bookSearchResults && bookSearchResults.length > 0 && (
              <FlatList
                numColumns={1}
                data={bookSearchResults}
                renderItem={({ item }) => (
                  <Card
                    setUserShelf={setUserShelf}
                    bookItem={item}
                    id={item.id + Math.random()}
                  />
                )}
                keyExtractor={(item) => item.id}
                windowSize={1}
                scrollEnabled={true}
                style={{ flex: 1, paddingBottom: 50 }}
                ListFooterComponent={
                  <View style={{ height: 0, marginBottom: 20 }}></View>
                }
              />
            )}
          </View>
        )}

        {showMusicSearch && (
          <View style={styles.searchItems}>
            {musicSearchResults && musicSearchResults.length > 0 && (
              <FlatList
                numColumns={1}
                data={musicSearchResults}
                renderItem={({ item }) => (
                  <Card
                    setUserShelf={setUserShelf}
                    musicItem={item}
                    id={item.track.key + Math.random()}
                  />
                )}
                keyExtractor={(item) => item.track.key}
                windowSize={1}
                scrollEnabled={true}
                style={{ flex: 1, paddingBottom: 50 }}
                ListFooterComponent={
                  <View style={{ height: 0, marginBottom: 20 }}></View>
                }
              />
            )}
          </View>
        )}
      </View>
      <Toast />
    </>
  );

  const trophiesContent = (
    <>
      <Pressable
        style={[styles.modalClose]}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <Ionicons name='close-circle' size={32} color='black' />
      </Pressable>
      <View>
        <Text style={styles.modalHeader}>YOUR TROPHIES</Text>
        <TrophiesBubbles />
      </View>
    </>
  );

  const onSubmitBook = async (query) => {
    searchBook(query)
      .then((item) => {
        setBookSearchResults(item);
      })
      .then(() => {
        console.log('Submitted Search');
      })
      .catch((err) => console.log(err));
  };

  const onSubmitMusic = async (query) => {
    searchMusicAlbum(query)
      .then((item) => {
        setMusicSearchResults(item);
        console.log('Submitted search!');
      })
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.quickAction}>
      <View style={styles.quickActionRow}>
        <View style={[styles.quickActionBubble, styles.bubbleOne]}>
          <TouchableOpacity>
            <Text style={styles.quickActionText}>MATCH ME!</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.quickActionBubble, , styles.bubbleTwo]}>
          <TouchableOpacity>
            <Text style={styles.quickActionText}>PAST MATCHES</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.quickActionRow}>
        <View style={[styles.quickActionBubble, , styles.bubbleThree]}>
          {whichModal === 'search' && (
            <ModalComponent
              content={addToShelfContent}
              modalVisible={modalVisible}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              toggleModal('search');
            }}>
            <Text style={styles.quickActionText}>ADD TO SHELF</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.quickActionBubble, , styles.bubbleFour]}>
          {whichModal === 'trophies' && (
            <ModalComponent
              content={trophiesContent}
              modalVisible={modalVisible}
            />
          )}

          <TouchableOpacity onPress={() => toggleModal('trophies')}>
            <Text style={styles.quickActionText}>TROPHIES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  quickActionRow: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    width: '50%',
  },
  quickActionBubble: {
    borderColor: 'black',
    borderRadius: 100,
    width: 150,
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  quickActionText: {
    textAlign: 'center',
    fontFamily: 'Jost_700Bold_Italic',
    fontSize: 18,
  },
  bubbleOne: {
    backgroundColor: '#00C9FF',
  },
  bubbleTwo: { backgroundColor: '#F5F9AE' },
  bubbleThree: { backgroundColor: '#F47272' },
  bubbleFour: { backgroundColor: '#DA90FF' },
  modalClose: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 3,
  },
  modalContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
    marginLeft: 10,
    marginBottom: 5,
    width: '80%',
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 100,
  },
  searchButton: {
    padding: 10,
    alignItems: 'center',
  },
  searchItems: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  bubbleContainer: {
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F47272',
    margin: 20,
  },
  bubbleWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalHeader: {
    textAlign: 'center',
    paddingTop: 22,
    fontSize: 24,
    fontFamily: 'Jost_700Bold_Italic',
  },
});

export default QuickActions;
