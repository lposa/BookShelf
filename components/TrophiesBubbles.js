import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

function TrophiesBubbles() {
  const userTrophies = require('../database/userTrophies');
  const [trophies, setTrophies] = useState();

  useEffect(() => {
    setTrophies(userTrophies.trophies);
  }, [trophies]);

  return (
    <View style={{ flexDirection: 'row' }}>
      <FlatList
        numColumns={1}
        data={trophies}
        renderItem={({ item }) =>
          item.earned && (
            <View style={styles.bubbleWrapper}>
              <TouchableOpacity style={styles.bubbleContainer}>
                <Image
                  resizeMode='contain'
                  style={styles.trophyImage}
                  source={item.img}
                />
              </TouchableOpacity>
              <Text
                style={{ textAlign: 'center', marginTop: 10, fontSize: 18 }}>
                {item.name}
              </Text>
            </View>
          )
        }
        keyExtractor={(item) => item.name}
        windowSize={1}
        scrollEnabled={true}
        style={{ flex: 1, paddingBottom: 50 }}
        ListFooterComponent={
          <View style={{ height: 100, marginBottom: 50 }}></View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  trophyImage: {
    height: 100,
    width: 100,
  },
  bubbleContainer: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  bubbleWrapper: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrophiesBubbles;
