import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchDealsSearchResults, fetchInitialDeals } from './src/services/api';
import DealList from './src/components/DealList';
import DealDetails from './src/components/DealDetails';
import Searchbar from './src/components/Searchbar';

export default function App() {
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);
  const [dealsFormSearch, setDealsFormSearch] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const dealsList = await fetchInitialDeals();
      setDeals(dealsList);
    }

    fetchData();
  }, []);

  const setCurrentDeal = (id) => {
    setCurrentDealId(id);
  };

  const searchDeals = async (searchTerm) => {
    searchTerm && setDealsFormSearch(await fetchDealsSearchResults(searchTerm));
  };

  const clearSearch = () => {
    setDealsFormSearch([]);
  };

  const unsetCurrentDeal = () => {
    setCurrentDealId(null);
  };

  const currentDeal = () => {
    return deals.find((deal) => deal.key === currentDealId);
  };

  const dealsToDisplay = dealsFormSearch.length > 0 ? dealsFormSearch : deals;

  return (
    <View style={styles.container}>
      {currentDealId ? (
        <View style={styles.main}>
          <DealDetails initialDeal={currentDeal()} onBack={unsetCurrentDeal} />
        </View>
      ) : dealsToDisplay.length > 0 ? (
        <View style={styles.main}>
          <Searchbar searchDeals={searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={setCurrentDeal} />
        </View>
      ) : (
        <View style={styles.centerContent}>
          <Text>Loading...!</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  main: {
    marginTop: 30,
  },
});
