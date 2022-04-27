import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

import ShelfRow from './ShelfRow';

function Shelf({ userShelf, setUserShelf }) {
  return (
    <View style={{ position: 'relative' }}>
      <View style={styles.shelfContainer}>
        <View style={styles.shelfRow}>
          <ShelfRow userShelf={userShelf} setUserShelf={setUserShelf} />
        </View>
      </View>
      <Image
        style={styles.shelfImg}
        source={require('../Design/Assets/shelfDefault.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shelfImg: {
    resizeMode: 'contain',
    width: windowWidth,
    height: 400,
  },
  shelfContainer: {
    position: 'absolute',
    flex: 1,
    flexWrap: 'wrap',
    left: 0,
    zIndex: 9999,
    width: '100%',
  },
  shelfRow: {
    flexWrap: 'wrap',
    position: 'relative',
    flex: 1,
    paddingVertical: 60,
    width: '100%',
  },
});

export default Shelf;
