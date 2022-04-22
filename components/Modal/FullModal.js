import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import CustomBtn from '../Common/CustomBtn';
const H = Dimensions.get('window').height;
const FullModal = ({onClose}) => {
  const [imgSrc, setImgSrc] = useState('');
  useEffect(() => {
    getImg();
  }, []);

  const getImg = async () => {
    try {
      const res = await fetch('https://picsum.photos/200/300');
      if (res.ok) {
        setImgSrc(res.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.modal_container}>
      <View style={styles.modal_header}>
        <CustomBtn title="close" onPress={onClose} />
        <Text>FullModal</Text>
      </View>
      <View style={styles.modal_body}>
        {imgSrc !== '' && (
          <Image style={styles.modal_img} source={{uri: imgSrc}} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal_container: {
    width: '100%',
    height: H,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal_header: {
    top: 0,
  },
  modal_body: {
    marginBottom: 100,
  },
  modal_img: {
    width: 300,
    height: 300,
  },
});

export default FullModal;
