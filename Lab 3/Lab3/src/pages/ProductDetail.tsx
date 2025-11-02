/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card } from 'react-native-paper';
import { Product } from './ProductPage';

export const ProductDetail = () => {
  const [data, setData] = useState<Product[]>([]);
  const filePath = 'https://dummyjson.com/products/' + 1;
  useEffect(() => {
    //Alert.alert(filePath);
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData([d]);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Detail</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10, marginTop: 10, padding: 10 }}>
            <Text style={styles.detail}>Product Detail</Text>
            <Card.Title title={item.title}>{item.title}</Card.Title>
            <Card.Cover source={{ uri: item.thumbnail }} />
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 200,
              }}
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  button: {
    // width: 250,
    backgroundColor: '#674EA4',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
});
