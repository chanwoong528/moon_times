import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import StackNav from './Stack/StackNav';

const App = () => {
  return <StackNav />;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  title: {fontWeight: 'bold', fontSize: 30, marginBottom: 30},
});

export default App;
