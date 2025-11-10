/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Contact,
  fetchContactsSuccess,
  RootState,
} from '../stores/ApplicationStore';
import { ContactListItem } from '../components/ContactListItem';
import { ContactService } from '../stores/ContactService';

export const ContactPage = ({ navigation }: { navigation: any }) => {
  // const contacts = useSelector((state: RootState) => state.contacts);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const dispatch = useDispatch();
  const fetchContacts = async () => {
    const data = await fetch('https://randomuser.me/api/?results=50');
    const mapContacts = await data.json();
    await ContactService.fetchFromAPI(mapContacts.results);
    return mapContacts.results;
  };

  const refresh = useCallback(async () => {
    fetchContacts();
    const data = await ContactService.getContacts();
    console.log(data);
    setContacts(data);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  //use redux store
  // useEffect(() => {
  //   fetchContacts()
  //     .then(contact => {
  //       dispatch(fetchContactsSuccess(contact));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [dispatch]);

  const renderContacts = ({ item }: { item: Contact }) => {
    return (
      <ContactListItem
        name={item.name}
        avatar={item.picture}
        phone={item.phone}
        key={item.phone}
        onPress={() =>
          navigation.navigate('ContactDetail', {
            contact: item,
          })
        }
      />
    );
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderContacts}
      />
    </View>
  );
};
