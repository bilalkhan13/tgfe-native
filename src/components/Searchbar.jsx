import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const Searchbar = ({ searchDeals, initialSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);


  const debouncedSearchDeals = debounce(searchDeals, 300);

  const handleChange = (text) => {
    setSearchTerm(text);
    debouncedSearchDeals(text);
  };

  searchDeals = () => {
    searchDeals(searchTerm);
    input.blur();
  }

  return (
    <TextInput
    ref={(inputElement)=>{inputElement}}
    value={searchTerm}
      placeholder="Search All Deals"
      style={styles.input}
      onChangeText={handleChange} // Use onChangeText instead of onChange
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
    marginBottom: 5
  },
});

Searchbar.propTypes = {
  searchDeals: PropTypes.func.isRequired,
  initialSearchTerm: PropTypes.string.isRequired,
};

export default Searchbar;
