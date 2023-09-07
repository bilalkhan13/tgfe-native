import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Easing,
  Dimensions,
} from 'react-native';
import { fetchDealsSearchResults, fetchInitialDeals } from './src/services/api';
import DealList from './src/components/DealList';
import DealDetails from './src/components/DealDetails';
import Searchbar from './src/components/Searchbar';

export default function App() {
  const titleXPos = new Animated.Value(0);
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);
  const [dealsFormSearch, setDealsFormSearch] = useState([]);
  const [activeSearchTerm, setActiveSearchTerm] = useState('');


  const animatedTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
    Animated.timing(titleXPos, {
      toValue: direction * (width / 2),
      duration: 3000,
      easing: Easing.ease,
      useNativeDriver: true, // Specify useNativeDriver as true
    }).start(({ finished }) => {
      finished &&
      animatedTitle(-1 * direction);
    });
  };

  useEffect(() => {
    animatedTitle();

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
    setActiveSearchTerm(searchTerm);
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

  const animatedStyle = {
    transform: [{ translateX: titleXPos }],
  };

  return (
    <View style={styles.container}>
      {currentDealId ? (
        <View style={styles.main}>
          <DealDetails initialDeal={currentDeal()} onBack={unsetCurrentDeal} />
        </View>
      ) : dealsToDisplay.length > 0 ? (
        <View style={styles.main}>
          <Searchbar searchDeals={searchDeals} initialSearchTerm={activeSearchTerm}/>
          <DealList deals={dealsToDisplay} onItemPress={setCurrentDeal} />
        </View>
      ) : (
        <Animated.View style={[ animatedStyle, styles.centerContent]}>
          <Text>Loading...!</Text>
        </Animated.View>
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
