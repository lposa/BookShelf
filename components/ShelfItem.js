import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  TextInput,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import ModalComponent from './ModalComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
import DialogInput from 'react-native-dialog-input';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
  Martel_300Light,
} from '@expo-google-fonts/dev';

function ShelfItem({ book, id, setUserShelf }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [reviewText, setReviewText] = useState();
  const [shelfData, setshelfData] = useState([]);

  const userShelfData = require('../database/userShelf');

  useEffect(() => {
    setshelfData(book);
  }, []);

  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const reviewLetter = {
    1: 'Very bad',
    2: 'Bad',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };

  function createReview(reviewRating, reviewText) {
    const bookToBeUpdated = [...userShelfData.userShelf];
    bookToBeUpdated[id].reviewRating = reviewRating;
    bookToBeUpdated[id].reviewText = reviewText;
    setUserShelf(bookToBeUpdated[id]);
    setShowDialog(false);
    ToastAndroid.showWithGravity(
      'A pikachu didnt like your review',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  const placeholderImage = require('../assets/placeholder.jpg');

  const modalContent = (
    <View style={{ flex: 1 }}>
      <Pressable
        style={[styles.modalClose]}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <Ionicons name='close-circle' size={32} color='black' />
      </Pressable>

      <View style={{ flex: 0.4, flexDirection: 'row', padding: 10 }}>
        <Image
          resizeMode='contain'
          style={styles.imageModal}
          source={{ uri: book.img }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.textModal}>{shelfData.title} </Text>
          <Text style={[styles.textModal, { color: 'gray' }]}>
            {shelfData.author}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 150 }}>
        <View style={{ borderWidth: 1, marginTop: 100 }}></View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{
              marginLeft: 15,
              position: 'absolute',
              flex: 1,
              flexDirection: 'row',
              height: 50,
            }}
            onPress={() => {
              setShowReviewInput(!showReviewInput);
            }}>
            <Ionicons name='add-circle-outline' size={42} color='black' />
          </TouchableOpacity>

          <Text style={styles.reviewTextModal}>My review</Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            {Array(book.reviewRating).fill(
              <Ionicons
                id={id + Math.random()}
                name='star'
                size={24}
                color='gold'
              />
            )}

            <Text style={{ fontSize: 20, paddingLeft: 8 }}>
              ({book.reviewRating}) {reviewLetter[book.reviewRating]}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
            }}>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
              }}>
              {!showReviewInput && (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginTop: 20,
                    fontFamily: 'Jost_400Regular',
                  }}>
                  {book.reviewText}
                </Text>
              )}
              {showReviewInput && (
                <>
                  <TextInput
                    multiline={true}
                    placeholder='Write your review!'
                    placeholderTextColor='grey'
                    onChangeText={(newText) => setReviewText(newText)}
                    style={styles.reviewTextInput}></TextInput>
                  <TouchableOpacity
                    style={styles.submitReviewBtn}
                    onPress={() => {
                      setShowReviewInput(false);
                      setShowDialog(true);
                    }}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </>
              )}
              <DialogInput
                isDialogVisible={showDialog}
                title={'Rate from 1 to 5'}
                hintInput={'Enter a WHOLE number'}
                submitInput={(num) => {
                  const reviewNum = parseInt(num);
                  createReview(reviewNum, reviewText);
                }}
                closeDialog={() => {
                  setShowDialog(false);
                }}></DialogInput>
              <View style={{ borderWidth: 1, marginTop: 500 }}></View>
              {/* maybe there is a better way to do this? */}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={{ paddingVertical: 15 }}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image
          resizeMode='contain'
          style={styles.images}
          source={{ uri: book.img }}
        />

        <ModalComponent content={modalContent} modalVisible={modalVisible} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  images: {
    position: 'relative',
    height: 90,
    width: 80,
    zIndex: 9999999,
  },
  imageModal: {
    height: 230,
    width: 180,
  },
  modalClose: {
    alignItems: 'flex-end',
    padding: 10,
  },
  textModal: {
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    fontSize: 18,
    fontFamily: 'Jost_600SemiBold',
    height: 70,
  },
  reviewTextModal: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Jost_600SemiBold',
  },
  reviewTextInput: {
    flex: 1,
    height: 200,
    width: '90%',
    position: 'absolute',
    borderWidth: 1,
    textAlign: 'center',
  },
  submitReviewBtn: {
    height: 30,
    width: 150,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31AFB4',
    fontWeight: 'bold',
    borderRadius: 50,
  },
});
export default ShelfItem;
