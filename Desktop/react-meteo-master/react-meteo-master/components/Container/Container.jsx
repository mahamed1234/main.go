import { S } from "./Container.style";
import { ImageBackground } from "react-native";
import backgroundIMG from "../../assets/background.png";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
export function Container({children}){
    return(
    <ImageBackground source={backgroundIMG} style={S.img_Background} imageStyle={S.img}>
        <SafeAreaProvider>
            <SafeAreaView style={S.container}>{children}</SafeAreaView>
        </SafeAreaProvider>
    </ImageBackground>
    )
}