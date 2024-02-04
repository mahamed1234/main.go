import { Image, View } from "react-native";
import { S } from "./ForecastListItem.style";
import { Txt } from "../Txt/Txt";
export function ForecastListItem({ image, day, date, temperature }) {
  return (
    <View style={S.container}>
      <Image style={S.image} source={image} />
      <Txt style={S.day}>{day}</Txt>
      <Txt style={S.date}>{date}</Txt>
      <Txt style={S.temperature}>{temperature}°</Txt>
    </View>
  );
}