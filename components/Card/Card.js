import React from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Card = ({article}) => {
  const navigation = useNavigation();

  const onPressCard = () => {
    navigation.navigate('single', {news: article});
  };

  return (
    <Pressable onPress={onPressCard} style={styles.card}>
      <Image
        style={styles.img}
        resizeMode="stretch"
        source={{uri: article.urlToImage}}
      />
      <View style={{flexDirection: 'row', width: '80%'}}>
        <Text style={{padding: 12}} numberOfLines={3}>
          {article.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 4,
    padding: 4,
  },
  img: {width: 80, height: 80, padding: 10, borderRadius: 10},
});

export default Card;
