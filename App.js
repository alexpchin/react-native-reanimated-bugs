import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  // TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb282b',
    title: 'Fourth Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97as3',
    title: 'Fifth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e294f',
    title: 'Sixth Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53lnasdsd',
    title: 'Seventh Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fblklmasass3',
    title: 'Eigth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557lnasd4f',
    title: 'Ninth Item',
  },
];

const Item = ({title, onPress}) => {
  const [deleting, setDeleting] = useState(false);

  const _onPress = () => {
    setDeleting(true);

    // Calling before to have a delay before state update
    onPress();

    setTimeout(() => {
      // Will cause:
      // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
      setDeleting(false);
    }, 2000);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={_onPress}>
        <View style={styles.button}>
          {deleting ? <ActivityIndicator /> : <Text>Delete</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [data, setData] = useState(DATA);

  const onPress = (id) => {
    setData(data.filter((d) => d.id !== id));
  };

  const renderItem = ({item}) => (
    <Item title={item.title} onPress={() => onPress(item.id)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.button}
        onPress={() => Alert.alert('Pressed')}
        title={'Button'}
      />
      <AnimatedFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
        // This seems to work better
        // keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: 'green',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  button: {
    width: 100,
    height: 20,
    backgroundColor: 'red',
  },
});

export default App;
