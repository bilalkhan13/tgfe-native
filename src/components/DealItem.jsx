import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { priceDisplay } from '../utils/utils';

const DealItem = ({ deal, onPress }) => {
  const handlePress = () => {
    onPress(deal.key)
  }

  return (
    <TouchableOpacity style={styles.deal} onPress={handlePress}>
      <Image source={{ uri: deal.media[0] }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.cause}>{deal.cause.name}</Text>
          <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',

  },
});

DealItem.propTypes = {
  deal: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default DealItem;
