import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import ShelfItem from './ShelfItem';

function ShelfRow({ userShelf, setUserShelf }) {
  return (
    <>
      <View style={styles.shelfRow}>
        <FlatList
          data={userShelf}
          numColumns={4}
          keyExtractor={(item) => item.id}
          extraData={userShelf}
          renderItem={({ item, index }) => {
            return (
              <ShelfItem book={item} id={index} setUserShelf={setUserShelf} />
            );
          }}
        />
      </View>
      <TouchableOpacity style={{ marginTop: 220 }}></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  shelfRow: {
    position: 'absolute',
    zIndex: 99999,
    height: 340,
    width: '90%',
    top: 25,
    left: 15,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

export default ShelfRow;
