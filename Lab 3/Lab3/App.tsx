import React, { useState } from 'react';

import { ProductPage } from './src/pages/ProductPage';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProductSearch } from './src/pages/ProductSearch';
import { ProductDetail } from './src/pages/ProductDetail';
import { AddProduct } from './src/pages/AddProduct';

function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'products',
      title: 'Products',
      focusedIcon: 'shopping',
      unfocusedIcon: 'shopping-outline',
    },
    {
      key: 'productAdd',
      title: 'Add',
      focusedIcon: 'plus',
      unfocusedIcon: 'plus-outline',
    },
    {
      key: 'productSearch',
      title: 'Search',
      focusedIcon: 'card-search',
      unfocusedIcon: 'card-search-outline',
    },
    {
      key: 'productDetail',
      title: 'Detail',
      focusedIcon: 'card-details',
      unfocusedIcon: 'card-details-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    products: ProductPage,
    productAdd: AddProduct,
    productSearch: ProductSearch,
    productDetail: ProductDetail,
  });

  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

export default App;
