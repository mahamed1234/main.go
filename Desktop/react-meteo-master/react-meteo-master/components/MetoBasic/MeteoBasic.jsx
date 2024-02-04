import { Image, TouchableOpacity, View } from "react-native";
import {Txt} from "../Txt/Txt";
import {S} from "./MeteoBasic.style.js"
import { Clock } from "../Clock/Clock.jsx";


export function MeteoBasic({onPress,temperature, city, interpretation}){
    return (
        <>
            <View style={S.clock}>
                <Clock />
            </View>

            <Txt>{city}</Txt>

            <Txt style={S.weather_label}>{interpretation.label}</Txt>

            <View style={S.temperature_box}>
                <TouchableOpacity onPress={onPress}>
                    <Txt style={S.temperature}>{temperature}°</Txt>
                </TouchableOpacity>
                <Image style={S.image} source={interpretation.image} />
            </View>
        </>
    )
}