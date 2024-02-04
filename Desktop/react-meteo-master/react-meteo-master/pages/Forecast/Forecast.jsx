import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container } from "../../components/Container/Container.jsx";
import { Txt } from "../../components/Txt/Txt.jsx";
import { S } from "./Forecast.style.js";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ForecastListItem } from "../../components/ForecastListItem/ForecastListItem.jsx";
import { getWeatherInterpretation } from "../../services/meteo-service.js";
import { dateToDDMM, DAYS } from "../../services/date-service.js";
import styles from "../favorites/FavoritesPages.style.js";

export function Forecast({}) {
  const { params } = useRoute();
  const nav = useNavigation();
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    // Charger la liste des favoris depuis le stockage lorsque la page est montée
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const key = "favorites";
      const existingDataString = await AsyncStorage.getItem(key);
      const existingData = JSON.parse(existingDataString) || { value: [] };

      setFavoriteList(existingData.value);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const addToFavorites = async (city) => {
    try {
      const isFavorite = favoriteList.includes(city);
      const key = "favorites";

      if (!isFavorite) {
        const updatedData = { value: [...favoriteList, city] };
        await AsyncStorage.setItem(key, JSON.stringify(updatedData));
      } else {
        const updatedData = { value: favoriteList.filter(item => item !== city) };
        await AsyncStorage.setItem(key, JSON.stringify(updatedData));
      }

      loadFavorites(); 
    } catch (error) {
      console.error("Error in addToFavorites:", error);
    }
  };

  const backButton = (
    <TouchableOpacity style={S.back_btn} onPress={() => nav.goBack()}>
      <Txt> {"<"} </Txt>
    </TouchableOpacity>
  );
  
  const favoriteButton = (
    <TouchableOpacity onPress={() => addToFavorites(params.city)}>
       <View style={S.favoriteButton}>
      <Image
        source={require("../../assets/filledStar.png")}
        style={S.favoriteIcon} // Apply the style to the Image
      />
    </View>
  </TouchableOpacity>
  );

  const header = (
    <View style={S.header}>
      {backButton}
      <View style={S.header_texts}>
        <Txt bold> {params.S} </Txt>
        <Txt bold align="center"></Txt>
        <Txt>{params.city}</Txt>
        {favoriteButton}
        <Txt style={S.subtitle}>Prévisions sur 7 jours</Txt>
      </View>
    </View>
  );

  const forecastList = (
    <View style={S.forecastList}>
      {params.time.map((time, index) => {
        const code = params.weathercode[index];
        const interpretation = getWeatherInterpretation(code);
  
        if (interpretation) {
          const image = interpretation.image;
          const date = new Date(time);
          const day = DAYS[date.getDay()];
          const temperature = params.temperature_2m_max[index];
  
          return (
            <ForecastListItem
              image={image}
              day={day}
              key={time}
              date={dateToDDMM(date)}
              temperature={temperature.toFixed(0)}
            />
          );
        } else {
          console.log('No weather interpretation for time', time);
          return null;
        }
      })}
    </View>
  );
  

  return (
    <Container>
      {header}
      {forecastList}
    </Container>
  );
}

