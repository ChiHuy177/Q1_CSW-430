/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { ContactThumb } from '../components/ContactThumb';
import { Contact, RootState } from '../stores/ApplicationStore';
import { FlatList, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { ContactService } from '../stores/ContactService';

export const FavouritePage = ({ navigation }: { navigation: any }) => {
  // const contacts = useSelector((state: RootState) => state.contacts);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const refresh = useCallback(async () => {
    const data = await ContactService.getContacts();
    console.log(data);
    setContacts(data);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const renderFavouriteThumbnail = ({ item }: { item: Contact }) => {
    return (
      <ContactThumb
        textColor={'white'}
        avatar={item.picture}
        onPress={() => {
          navigation.navigate('ContactDetail', { contact: item });
        }}
        name={item.name}
        phone={item.phone}
      />
    );
  };

  const favourites = contacts.filter(contact => contact.favorite);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 80,
      }}
    >
      <FlatList
        data={favourites}
        keyExtractor={item => item.phone}
        numColumns={3}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={renderFavouriteThumbnail}
      />
    </View>
  );
};
