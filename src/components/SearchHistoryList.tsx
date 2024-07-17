import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  searchHistory: string[];
  onHistoryItemPress: (item: string) => void;
  onHistoryItemDelete: (item: string) => void;
}

const SearchHistoryList: React.FC<Props> = ({ searchHistory, onHistoryItemPress, onHistoryItemDelete }) => {
  const renderSearchHistoryItem = ({ item }: any) => (
    <TouchableOpacity style={styles.historyItem} onPress={() => onHistoryItemPress(item)} onLongPress={() => onHistoryItemDelete(item)}>
      <Text style={styles.historyText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.historyTitle}>Search History:</Text>
      <FlatList data={searchHistory} keyExtractor={(_, index) => index.toString()} renderItem={renderSearchHistoryItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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

export default SearchHistoryList;