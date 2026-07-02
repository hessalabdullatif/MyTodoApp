import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView, RefreshControl
} from 'react-native';
import axios from 'axios';
import useStores from '../hooks/useStores';
import {SafeAreaView,SafeAreaProvider} from 'react-native-safe-area-context';

const image = require('../assets/Unknown.jpg');

const WeatherScreen = () => {
  const [temperature, setTemperature] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = () => {
    axios.get('https://api.open-meteo.com/v1/forecast?latitude=24.7136&longitude=46.6753&current=temperature_2m')
      .then((response) => {
        setTemperature(response.data.current.temperature_2m);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather();
  };

  return (
    <SafeAreaProvider>
       <ImageBackground source={image} resizeMode="cover" style={styles.background}>

    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.text}>Riyadh</Text>
      <Text style={styles.text}>{temperature}°C</Text>
    </ScrollView>
        </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({   
     background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
 
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color:'#fff'
  },
});

export default WeatherScreen;