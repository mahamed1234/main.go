import { StyleSheet } from "react-native";

const S= StyleSheet.create({
    date:{
        fontSize: 20,
    },
    day:{
        fontSize: 20,
    },
    container:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
    },
    image:{
        width: 50,
        height: 50,
    },
    forecastList:{
        marginTop: 50,
    },
    temperature:{
        width: 50,
        textAlign: 'right',
    }
})

export {S};