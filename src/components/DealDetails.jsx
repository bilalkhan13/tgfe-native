import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View, Pressable, ScrollView, PanResponder, Animated, Button, Linking} from 'react-native';
import { priceDisplay } from '../utils/utils';
import { fetchDealDetail } from '../services/api';
import { Dimensions } from 'react-native';

const DealDetails = ({ initialDeal, onBack }) => {
  const [deal, setDeal] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const imageXPos = new Animated.Value(0);
  const width = Dimensions.get('window').width - 150;


  const handleSwipe = (indexDirection) => {
    if (deal.media[imageIndex + indexDirection]) {
      Animated.spring(imageXPos, {
        useNativeDriver: true,
        toValue: -indexDirection * width,
      }).start(() => {
        // Next image
        imageXPos.setValue(width);
        setImageIndex((prevState) => imageIndex + indexDirection);
      });
    } else {
      Animated.spring(imageXPos, {
        useNativeDriver: true,
        toValue: 0,
      }).start()
    }
  };


  const openDealUrl = () => {
    Linking.openURL(deal.url)
  }

  const animatedStyle = {
    transform: [{ translateX: imageXPos }],
  };


  const imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      if (Math.abs(gs.dx) > width * 0.4) {
        const direction = Math.sign(gs.dx);
        Animated.timing(imageXPos, {
          toValue: direction * width,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          handleSwipe(-direction);
        });
      } else {
        Animated.spring(imageXPos, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    async function fetchData() {
      if (initialDeal) {
        setDeal(await fetchDealDetail(initialDeal?.key));
      }
    }

    fetchData();
  }, [initialDeal]);

  if (!deal) {
    // You can render a loading indicator or handle the absence of a deal here
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.deal}>
      <Pressable onPress={onBack}>
        <Text style={styles.backLink}>Back</Text>
      </Pressable>
      <Animated.Image {...imagePanResponder.panHandlers} source={{ uri: deal?.media?.[imageIndex] }} style={[animatedStyle,styles.image]} />

      <View>
        <Text style={styles.title}>{deal?.title}</Text>
      </View>
      <ScrollView style={styles.detail}>
        <View style={styles.footer}>
          <View style={styles.info}>
            <Image source={{ uri: deal?.user?.avatar }} style={styles.avatar} />
            <Text>{deal?.user.name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.cause}>{deal?.cause?.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal?.price)}</Text>
          </View>
        </View>
        <View style={styles.desc}>
          <Text>{deal?.description}</Text>
        </View>
        <Button title='Buy this deal' onPress={openDealUrl}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 15
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
  },
  desc: {
    paddingHorizontal: 5,
    lineHeight: 1,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  detail: {
    borderColor: '#bbb',
    borderWidth: 1,
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    // borderRadius: 50,
  },
});

DealDetails.propTypes = {
  initialDeal: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  imageIndex: PropTypes.number
};

export default DealDetails;
