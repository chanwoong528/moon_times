/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
PushNotification.configure({
  onNotification: function (notification) {
    PushNotification.localNotification({
      channelId: 'test-chan',
      title: notification.title,
      message: notification.message,
      smallIcon: notification.largeIconUrl,
    });
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
