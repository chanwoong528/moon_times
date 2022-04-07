import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
const Slidernews = () => {
  const navigation = useNavigation();
  const ScrollViewRef = useRef();
  const [slideridx, setSlideridx] = useState(0);
  const [news, setNews] = useState([]);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    getNews();
  }, []);
  const getNews = async () => {
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=5abec53e5e4b4d53bf3c9e11fce35c40`;
    const mediaStackUrl = `http://api.mediastack.com/v1/news?access_key=8b7bf605e55c4369f52c36219e978f93&limit=5&languages=en`;
    try {
      const res = await fetch(newsApiUrl);
      const newsAPI = await res.json();
      setNews(newsAPI.articles);
    } catch (error) {
      console.log(error);
      Alert.alert('Error API', 'Error getting News form API');
    }
  };

  const onLongPressArticle = url => {
    //open urlfirst, or navigate to single page.

    //window.open(url);
    Linking.openURL(url);
  };
  const onPressSingleArticle = news => {
    navigation.navigate('single', {news});
  };
  const onScrollSlider = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== slideridx) setSlideridx(slide);
    }
  };
  const onEndScroll = nativeEvent => {
    if (nativeEvent.contentOffset.x > 1570) {
      ScrollViewRef.current.scrollTo({x: 0, animated: true});
    }
    if (nativeEvent.contentOffset.x === 0) {
      ScrollViewRef.current.scrollTo({x: 1570, animated: true});
    }
  };
  return (
    <View style={{height: H * 0.45}}>
      <ScrollView
        ref={ScrollViewRef}
        onScroll={({nativeEvent}) => onScrollSlider(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={({nativeEvent}) => onEndScroll(nativeEvent)}
        pagingEnabled
        horizontal
        style={styles.container}>
        {news.map((item, index) => (
          <Pressable
            key={index}
            style={styles.card}
            onLongPress={() => {
              onLongPressArticle(item.url);
            }}
            onPress={() => {
              onPressSingleArticle(item);
            }}>
            <View style={styles.border}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Image
                style={styles.img}
                key={item.url}
                resizeMode="stretch"
                source={{uri: item.urlToImage}}
              />
              <Text style={styles.body} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.dot_container}>
        {news.map((item, idx) => (
          <Text
            key={idx}
            style={{
              color: slideridx === idx ? 'black' : 'lightgrey',
            }}>
            ■
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 1,
    backgroundColor: 'transparent',
    flex: 1,
  },
  card: {
    // borderWidth: 1,
    // borderColor: 'green',
    flexDirection: 'column',
    width: W,
    height: H * 0.4,
    paddingHorizontal: 30,
  },
  border: {
    width: '100%',
    height: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    padding: 10,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  img: {
    height: H * 0.25,
    alignContent: 'center',
  },
  body: {
    marginTop: 10,
  },
  dot_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Slidernews;
