import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  Share,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

import Icon from 'react-native-vector-icons/FontAwesome';
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const SingleArticle = ({route}) => {
  console.log(route.params.news);
  const {title, author, description, url, urlToImage, publishedAt, content} =
    route.params.news;
  const onScheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-chan',
      title: `News [${title}]`,
      message: 'Saved!',
      date: new Date(Date.now() + 2 * 1000),
      allowWhileIdle: true,
    });
  };
  const onLocalNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-chan',
      title: `News [${title}]`,
      message: 'Saved!',
    });
    // PushNotification.localNotificationSchedule({
    //   channelId: 'test-chan',
    //   title: `Scheduled News [${title}]`,
    //   message: 'Saved!',
    //   date: new Date(Date.now() + 2 * 1000),
    //   allowWhileIdle: true,
    // });
  };
  const onShare = async (title, url) => {
    try {
      const result = await Share.share({title, url, message: url});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('cancel sharing');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.sub_header}>
            <Text>Published: {publishedAt.slice(0, 10)}</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="heart"
                size={30}
                color="red"
                style={{marginHorizontal: 5}}
              />
              <Icon name="commenting-o" size={30} color="black" />
            </View>
          </View>
        </View>
        <ScrollView>
          <Text style={styles.text}>{author}</Text>
          <Text style={styles.text}>{content}</Text>

          {urlToImage && (
            <Image
              style={styles.img}
              source={{uri: urlToImage}}
              resizeMode="stretch"
            />
          )}
        </ScrollView>

        <View style={styles.share_con}>
          <Icon
            name="share-square-o"
            size={30}
            color="black"
            style={styles.icon}
            onPress={() => {
              onShare(title, url);
            }}
          />
          <Icon
            onPress={onLocalNotification}
            style={styles.icon}
            name="save"
            size={30}
            color="black"
          />
          <Icon
            style={styles.icon}
            name="commenting-o"
            size={30}
            color="black"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10, height: '100%'},
  header: {borderBottomColor: 'black', borderBottomWidth: 1, padding: 10},
  title: {fontSize: 25},
  sub_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {width: W, height: H * 0.5},
  text: {fontSize: 20},
  share_con: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  },
  icon: {marginHorizontal: 10},
});

export default SingleArticle;
