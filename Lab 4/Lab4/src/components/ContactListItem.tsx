/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

type ContactListItemProps = {
  name: string;
  avatar: string;
  phone: string;
  onPress: () => void;
};

export const ContactListItem = (props: ContactListItemProps) => {
  const { name, avatar, phone, onPress } = props;

  return (
    <TouchableHighlight
      underlayColor="red"
      style={{ paddingLeft: 50, marginTop: 0 }}
      onPress={onPress}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 24,
          paddingBottom: 24,
          borderBottomColor: 'grey',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Image
          source={{ uri: avatar }}
          style={{ borderRadius: 50, width: 50, height: 50 }}
        />
        <View style={{ justifyContent: 'center', flex: 1, marginLeft: 25 }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
            {name}
          </Text>
          <Text style={{ color: 'blue', fontSize: 14, marginTop: 4 }}>
            {phone}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
