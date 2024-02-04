import { StyleSheet } from "react-native";

const S= StyleSheet.create({
    clock: {
      
        justifyContent:"center"
    },
    weather_label: {
        alignSelf: "flex-end",
        transform: [{rotate:"-90deg"}],
        fontSize: 20,
    },
    image: {
        height: 90,
        width: 90,
    },
    temperature_box: {
        alignItems: "baseline",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    temperature: {
        fontSize: 120,

    }

})

export {S};