import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomBtn = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.btn_container} onPress={onPress}>
      <Text style={styles.btn_title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn_container: {},
  btn_title: {},
});

export default CustomBtn;
