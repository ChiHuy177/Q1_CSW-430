/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';

type ContactThumbProps = {
  name: string;
  phone: string;
  avatar: string;
  textColor: string;
  onPress: () => void;
};

export const ContactThumb = (props: ContactThumbProps) => {
  const { name = '', phone = '', avatar = '', textColor = '', onPress } = props;

  const colorStyle = {
    color: textColor,
  };

  const ImageContact = onPress !== undefined ? TouchableOpacity : View;

  return (
    <View
      style={{
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ImageContact onPress={onPress}>
        <Image
          source={{ uri: avatar }}
          style={{
            width: 90,
            height: 90,
            borderRadius: 40,
            borderColor: 'white',
            borderWidth: 2,
          }}
        ></Image>
      </ImageContact>
      {name !== '' && <Text>{name}</Text>}
      {phone !== '' && (
        <View>
          {/* <Icon></Icon> */}
          <Text style={colorStyle}>{phone}</Text>
        </View>
      )}
    </View>
  );
};
