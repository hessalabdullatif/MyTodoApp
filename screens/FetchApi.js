import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, RefreshControl } from 'react-native';

const image = require('../assets/Unknown.jpg');

const FetchApi = () => {
  const [temperature, setTemperature] = useState(null);
  const [refreshing, setRefreshing] = useState(false); 

  const fetchWeather = () => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=24.7136&longitude=46.6753&current=temperature_2m')
      .then((response) => response.json())
      .then((data) => {
        setTemperature(data.current.temperature_2m);
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
    color: '#fff',
  },
});

export default FetchApi;