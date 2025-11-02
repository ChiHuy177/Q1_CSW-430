import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export const ProductPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const url = 'https://dummyjson.com/products';

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List Chí Huy</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1.5 }}>
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: 120, height: 120 }}
              />
            </View>
            <View style={styles.eachItem}>
              <Text style={styles.itemTitle}>{item.title}</Text>

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
                <Text style={styles.iT}>Stock:</Text> {item.stock}
              </Text>
              <View style={styles.rowButton}>
                <Button title="Detail"/>
                <Button title="Add" />
                <Button title="Delete" />
              </View>
            </View>
          </View>
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
    fontSize: 30,
    marginBottom: 10,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#f0f0f0',
  },
  rowButton: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
  },
  eachItem: {
    marginBottom: 20,
    flex: 2.5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iT: {
    fontWeight: 'bold',
  },
  iTPrice: {
    fontWeight: 'bold',
    color: 'red',
  },
});
