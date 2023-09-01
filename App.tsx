/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
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

  const randomColorAdd = () => {
    const randomColor = color[Math.floor(Math.random() * color.length)];

    setCurrent(current + 1);

    if (current + 1 > largestItem) {
      setLargestItem(current + 1);
    }

    setColorItems([...colorItems, randomColor]);
  };

  const colorRemove = () => {
    if (colorItems.length === 0) {
      Alert.alert('No items to remove', 'Please add items first', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    }
    // colorItems.pop();
    // setColorItems([...colorItems]);

    const updatedColorItems = colorItems.slice(0, -1); // Create a new array without the last element
    setColorItems(updatedColorItems);

    setCurrent(current - 1);
  };

  const renderItem = ({item}: {item: string}) => (
    <View style={{backgroundColor: item, padding: 10}}>
      <Text>{item}</Text>
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
        {/* top view */}
        <View>
          {/* use flatList */}
          <FlatList
            data={colorItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* bottom view */}
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
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
            <Text style={styles.removeText}>Remove</Text>
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
            <Text style={styles.removeText}>Push</Text>
          </TouchableOpacity>
          {/* <View style={{backgroundColor: 'red', padding: 10}}></View> */}
        </View>
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

  removeText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  itemText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },
});

export default App;
