import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomBtn from '../Common/CustomBtn';

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
      <View>
        <CustomBtn title="close" onPress={onClose} />
        <Text>FullModal</Text>
      </View>
      <View>
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
    height: '100%',
  },
  modal_header: {},
  modal_body: {},
  modal_img: {
    width: 100,
    height: 100,
  },
});

export default FullModal;
