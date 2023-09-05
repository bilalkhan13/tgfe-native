import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import DealItem from './DealItem';

const DealList = ({ deals, onItemPress }) => {
  console.log(deals);
  return (
    <View style={styles.list}>
      <FlatList
        data={deals}
        renderItem={({ item }) => (
          <DealItem deal={item} onPress={onItemPress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%',
  },
});

DealList.propTypes = {
  deals: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
};

export default DealList;
