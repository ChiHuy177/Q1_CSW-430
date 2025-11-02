import { useState } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [price, setPrice] = useState('');
  const [discountPer, setDiscountPer] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: des,
        price: price,
        discountPercentage: discountPer,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        images: img,
      }),
    })
      .then(res => res.json())
      .then(console.log);
    Alert.alert('Add sucessful!');
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
      <Text style={styles.title}>Add a Product</Text>
      <Text style={styles.inputTitle}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Text style={styles.inputTitle}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={des}
        onChangeText={text => setDes(text)}
      />
      <Text style={styles.inputTitle}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={text => setPrice(text)}
      />
      <Text style={styles.inputTitle}>Discount percentage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter discount percentage"
        value={discountPer}
        onChangeText={text => setDiscountPer(text)}
      />
      <Text style={styles.inputTitle}>Rating</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter rating"
        value={rating}
        onChangeText={text => setRating(text)}
      />
      <Text style={styles.inputTitle}>Stock</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter stock"
        value={stock}
        onChangeText={text => setStock(text)}
      />
      <Text style={styles.inputTitle}>Brand</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter brand"
        value={brand}
        onChangeText={text => setBrand(text)}
      />
      <Text style={styles.inputTitle}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={category}
        onChangeText={text => setCategory(text)}
      />
      <Text style={styles.inputTitle}>Images</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter images"
        value={img}
        onChangeText={text => setImg(text)}
      />
      <Button title="Submit" onPress={() => handleSubmit()} />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'blue',
  },
  input: {
    margin: 5,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
