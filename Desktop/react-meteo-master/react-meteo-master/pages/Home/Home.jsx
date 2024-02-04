import { Alert, View } from "react-native";
import { S } from "./Home.style";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { MeteoAPI } from "../../api/meteo";
import { MeteoBasic } from "../../components/MetoBasic/MeteoBasic";
import { getWeatherInterpretation } from "../../services/meteo-service";
import { MeteoAdvanced } from "../../components/MeteoAdvanced/MeteoAdvanced";
import { useNavigation } from "@react-navigation/native";
import { Container } from "../../components/Container/Container";
import { SearchBar } from "react-native-screens";
import { Searchbar } from "../../components/Searchbar/Searchbar";
export function Home() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const nav = useNavigation();
  const currentWeather = weather?.current_weather;

  useEffect(() => {
    getUserCoords();
  }, []);

  useEffect(() => {
    if (coords) {
      fetchWeather(coords);
      fetchCity(coords);
    }
  }, [coords]);

  async function getUserCoords() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      console.log(setCoords("private"));
    } else {
      setCoords({ lat: "48.85", lng: "2.35" });
    }
  }

  async function fetchWeather(coordinates) {
    const weatherResponse = await MeteoAPI.fecthWeatherFromCoords(
      coordinates
    );
    setWeather(weatherResponse);
  }

  async function fetchCity(coordinates) {
    const cityResponse = await MeteoAPI.fecthCityFromCoords(
      coordinates
    );
    setCity(cityResponse);
  }

  async function fetchCoordsByCity(city) {
    try {
      const coords = await MeteoAPI.fetchCoordsFromCity(city);
      setCoords(coords);
    } catch (e) {
      Alert.alert("Oups !", e);
    }
  }
  function goToForecastPage() {
    nav.navigate("Forecast", { city, ...weather.daily });
  }

  return (
    <Container>
      {currentWeather ? (
        <>
          <View style={S.meteo_basic}>
            <MeteoBasic
              temperature={Math.round(currentWeather?.temperature)}
              city={city}
              interpretation={getWeatherInterpretation(
                currentWeather.weathercode
              )}
              onPress={goToForecastPage}
            />
          </View>
          <View style={S.searchbar_container}>
            <Searchbar onSubmit={fetchCoordsByCity} />
          </View>
          <View style={S.meteo_advance}>
            <MeteoAdvanced
              wind={currentWeather.windspeed}
              dusk={weather.daily.sunrise[0].split("T")[1]}
              dawn={weather.daily.sunset[0].split("T")[1]}
            />
          </View>
        </>
      ) : null}
    </Container>
  );
}