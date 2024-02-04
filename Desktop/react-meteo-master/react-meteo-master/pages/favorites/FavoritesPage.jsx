import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity ,ImageBackground} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./FavoritesPages.style";
export function FavoritesPage() {
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

      loadFavorites(); // Recharger la liste des favoris après la mise à jour
    } catch (error) {
      console.error("Error in addToFavorites:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Liste des favoris :</Text>
        <View>
          {favoriteList.map((favorite, index) => (
            <View key={index} style={styles.favoriteItem}>
              <Text>{favorite}</Text>
              <TouchableOpacity onPress={() => addToFavorites(favorite)}>
                <Text style={styles.removeButton}>Retirer des favoris</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

