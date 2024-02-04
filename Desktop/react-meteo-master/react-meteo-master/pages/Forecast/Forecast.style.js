import { StyleSheet } from "react-native";

const S= StyleSheet.create({
    header:{
        flexDirection: "row",
    },
    back_btn:{
        width: 30,
        height: 30,
        marginLeft:5,
    },
    subtitle:{
        fontSize: 30,
        marginTop: 40,

    },
    header_texts:{
        flex: 1,
        alignItems:"center",
        marginRight: 30,
        marginTop:-75,
        marginBottom:20,
    },

    favoriteIcon: {
        position: "absolute",
        right: -110,
        width: 40,
        height: 40,
        top: -40,
        marginRight: -42,

      },
    
})

export {S};