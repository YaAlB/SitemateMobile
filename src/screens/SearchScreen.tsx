import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationInjectedProps } from 'react-navigation';

import SearchHistoryList from '../components/SearchHistoryList';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

import flickrActions from '../reducers/flickr/actions';

interface Props extends NavigationInjectedProps {}

const SearchScreen: React.FC<Props> = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch<Redux.Dispatch>();
  const flickrActionDispatcher = bindActionCreators(flickrActions, dispatch);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return; // Prevent empty search terms
    }
    await flickrActionDispatcher.getImages(searchTerm, 1);

    const updatedHistory = [searchTerm, ...searchHistory.filter((item) => item !== searchTerm)];
    setSearchHistory(updatedHistory.slice(0, 3));
    AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory.slice(0, 3)));

    navigation.navigate('ImageList', { searchTerm });
  };

  const handleHistoryItemPress = (item: string) => {
    setSearchTerm(item);
    handleSearch();
  };

  const handleHistoryItemDelete = (item: string) => {
    const updatedHistory = searchHistory.filter((histItem) => histItem !== item);
    setSearchHistory(updatedHistory);
    AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter search term..." value={searchTerm} onChangeText={setSearchTerm} />
      <Button title="Search" onPress={handleSearch} />

      <SearchHistoryList
        searchHistory={searchHistory}
        onHistoryItemPress={handleHistoryItemPress}
        onHistoryItemDelete={handleHistoryItemDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  historyItem: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 10,
  },
  historyText: {
    fontSize: 16,
  },
});

export default SearchScreen;