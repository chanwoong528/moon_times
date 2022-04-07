import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';

import Card from '../Card/Card';

const CardList = ({category}) => {
  const [cateNews, setCateNews] = useState([]);
  const getCateNews = async () => {
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&category=${category}&apiKey=5abec53e5e4b4d53bf3c9e11fce35c40`;
    try {
      const res = await fetch(newsApiUrl);
      const newsAPI = await res.json();
      setCateNews(newsAPI.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCateNews();
  }, []);

  return (
    <View style={styles.cardlist_con}>
      <Text style={styles.cate_title}>{category.toUpperCase()}</Text>
      {cateNews.map(article => (
        <Card key={article.url} article={article} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cate_title: {
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  cardlist_con: {padding: 10, justifyContent: 'space-evenly'},
});

export default CardList;
