/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  useColorScheme,
  View,
  AppState,
  InteractionManager,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [current, setCurrent] = useState(0); // when user clicks remove, this should go back to zero
  const [largestItem, setLargestItem] = useState(0); //when user clicks remove, this should still remain the same, not go back to zero

  const [colorItems, setColorItems] = useState<string[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // note to self. track the timer with react's useState to avoid issues.

  const color = [
    'lightseagreen',
    'firebrick',
    'lightpink',
    'maroon',
    'cornflowerblue',
    'burlywood',
    'darkslateblue',
    'lightcoral',
    'orange',
    'darksalmon',
  ];

  //timer for 15 seconds.
  const countdownToRemoveAll = () => {
    if (colorItems.length === 0) {
      return;
    }

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      removeAllColors();
    }, 15000); // 15 seconds
    setTimer(newTimer);
  };

  // useEffect(() => {
  //   countdownToRemoveAll();
  // }, []);

  // reset timer if colorRemove has not been pressed for 15 seconds
  const randomColorAdd = () => {
    const randomColor = color[Math.floor(Math.random() * color.length)];

    setCurrent(current + 1);

    if (current + 1 > largestItem) {
      setLargestItem(current + 1);
    }

    setColorItems([...colorItems, randomColor]);
    countdownToRemoveAll();
  };

  // reset timer if colorRemove has not been pressed for 15 seconds
  const colorRemove = () => {
    if (colorItems.length === 0) {
      Alert.alert('No items to remove', 'Please add items first', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
      return;
    }

    const updatedColorItems = colorItems.slice(0, -1); // create a new array without the last element
    setColorItems(updatedColorItems);
    setCurrent(current - 1);
    countdownToRemoveAll();
  };

  const removeAllColors = () => {
    setColorItems([]);
    setCurrent(0);
  };

  const alertColorSelected = (color: string) => {
    clearTimeout(timer as NodeJS.Timeout);
    Alert.alert('Color Selected', `This is ${color}`, [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
        style: 'cancel',
      },
    ]);
    countdownToRemoveAll();
  };

  // the individual list of colors that are to be rendered
  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity
      onPress={alertColorSelected.bind(this, item)}
      style={{
        backgroundColor: item,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderBottomView = () => (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.itemText}>Current: {current} item</Text>
        <Text style={styles.itemText}>Largest: {largestItem} item</Text>
        <TouchableOpacity
          onPress={colorRemove}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffb3b3',
            width: '50%',
            height: 100,
          }}>
          <Text style={styles.removeAddText}>Remove</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={randomColorAdd}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            width: '50%',
            height: 100,
          }}>
          <Text style={styles.removeAddText}>Push</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor: '#f2f2f2',
        }}>
        {/* using flatList */}
        <View style={{height: 700}}>
          <FlatList
            data={colorItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}

            // ListFooterComponentStyle={{flex: 1}}
            // ListFooterComponent={renderBottomView}
          />
        </View>
        {renderBottomView()}

        {/* bottom view */}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  removeAddText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  itemText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },
});

export default App;
