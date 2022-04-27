import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';

const placeholderImage = require('../assets/placeholder.jpg');
const windowWidth = Dimensions.get('window').width;

function Card({ setUserShelf, bookItem, musicItem }) {
  const userShelfData = require('../database/userShelf');

  function addBookToShelf() {
    const book = {
      id: bookItem.id + '1',
      img: bookItem.volumeInfo.imageLinks.thumbnail,
      title: bookItem.volumeInfo.title,
      author: bookItem.volumeInfo.authors,
      reviewRating: 5,
      reviewText: 'Excellent!!!!',
    };

    const found = userShelfData.userShelf.some(
      (item) => item.title === book.title
    );
    if (!found) {
      userShelfData.userShelf.push(book); //might not need this line

      setUserShelf(book);
      Toast.show({ type: 'success', text1: 'Item added!' });
    } else {
      console.log('ALREADY EXISTS IN SHELF');
      Toast.show({
        type: 'error',
        text1: 'This item is already in your shelf!',
      });
    }

    return book;
  }

  function addMusicToShelf() {
    const music = {
      id: musicItem.track.key,
      img: musicItem.track.share.image,
      title: musicItem.track.title,
      author: musicItem.track.subtitle,
    };
    const found = userShelfData.userShelf.some(
      (item) => item.title === music.title
    );
    if (!found) {
      userShelfData.userShelf.push(music); //might not need this line

      setUserShelf(music);
      Toast.show({ type: 'success', text1: 'Item added!' });
    } else {
      console.log('ALREADY EXISTS IN SHELF');
      Toast.show({
        type: 'error',
        text1: 'This item is already in your shelf!',
      });
    }

    return music;
  }

  return (
    <>
      {bookItem && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            addBookToShelf();
          }}>
          {bookItem !== undefined ? (
            <Image
              resizeMode='cover'
              style={styles.bookImages}
              source={
                bookItem.volumeInfo.imageLinks !== undefined
                  ? { uri: bookItem.volumeInfo.imageLinks.thumbnail }
                  : placeholderImage
              }
            />
          ) : (
            <Text>No results found</Text>
          )}

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.text}>{bookItem.volumeInfo.title}</Text>
          </View>
        </TouchableOpacity>
      )}

      {musicItem && (
        <TouchableOpacity
          onPress={() => {
            addMusicToShelf();
          }}
          style={styles.container}>
          <Image
            resizeMode='cover'
            style={styles.musicImages}
            source={
              musicItem.track.share.image !== undefined
                ? { uri: musicItem.track.share.image }
                : placeholderImage
            }
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={styles.text}>{musicItem.track.title}</Text>
            <Text
              style={[
                styles.text,
                { width: 150, marginTop: 5, color: 'gray' },
              ]}>
              {musicItem.track.subtitle}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 5,
    flexDirection: 'row',
    position: 'relative',
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  bookImages: {
    height: 150,
    width: 100,
  },
  musicImages: {
    height: 150,
    width: 150,
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: 100,
  },
});

export default Card;
