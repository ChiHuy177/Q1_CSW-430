/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Card } from 'react-native-paper';
import { Product } from './ProductPage';

export const ProductSearch = () => {
  const [data, setData] = useState<Product[]>([]);
  const [value, setValue] = useState('');

  let filePath = 'https://dummyjson. com/products';

  const searchProduct = () => {
    if (value != '')
      filePath = 'https://dummyjson.com/products/search?q=' + value;
    // Alert.alert(filePath);
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
        console.log(data);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Product</Text>
      <Text>Search Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the name"
        value={value}
        onChangeText={text => setValue(text)}
      />
      <Button title="Search" onPress={searchProduct} />

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10, marginTop: 10, padding: 10 }}>
            <Text style={styles.detail}>Product Detail</Text>
            <Card.Title title={item.title}>{item.title}</Card.Title>
            <View
              style={{
                width: '100%',
                height: 250,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card.Cover
                source={{ uri: item.images[0] }}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
              />
            </View>
            <Text>
              <Text style={styles.iT}>Description:</Text> {item.description}
            </Text>
            <Text>
              <Text style={styles.iT}>Category:</Text> {item.category}
            </Text>
            <Text>
              <Text style={styles.iTPrice}>Price:</Text> {item.price}$
            </Text>
            <Text>
              <Text style={styles.iT}>Discount:</Text> {item.discountPercentage}
              %
            </Text>
            <Text>
              <Text style={styles.iT}>Rating:</Text> {item.rating} starts
            </Text>
            <Text>
              <Text style={styles.iT}>Stock:</Text> {item.stock} units
            </Text>
          </Card>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    fontSize: 25,
    color: 'blue',
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 10,
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detail: {
    paddingLeft: 5,
    margin: 10,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  iT: {
    fontWeight: 'bold',
  },
  iTPrice: {
    fontWeight: 'bold',
    color: 'red',
  },
});
