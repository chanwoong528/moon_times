import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import SliderNews from '../components/Slider/SliderNews';
import CardList from '../components/ListofCard/CardList';
const BS = 'business';
const EN = 'entertainment';
const GE = 'general';
const HE = 'health';

const Main = () => {
  console.log(Platform.OS === 'ios');
  const createChannel = () => {
    console.log('Channel Crreated');
    PushNotification.createChannel({
      channelId: 'test-chan',
      channelName: 'Test channel',
    });
  };
  useEffect(() => {
    createChannel();
  }, []);
  return (
    <ScrollView style={styles.main}>
      <StatusBar color="black" />
      <Text style={styles.title}>Moon Times</Text>
      <SliderNews />
      <CardList category={EN} />
      <CardList category={BS} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
    alignSelf: 'center',
  },
});

export default Main;
