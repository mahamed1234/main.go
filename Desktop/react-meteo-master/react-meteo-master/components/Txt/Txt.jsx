import { Text, useWindowDimensions } from "react-native";
import { S } from "./Txt.style";

export function Txt({ children, style }) {
  const { height } = useWindowDimensions();
  const fontSize = style?.fontSize || S.text.fontSize;
  return (
    <Text
      style={[
        S.text,
        style,
        { fontSize: fontSize * 0.00118 * height },
      ]}
    >
      {children}
    </Text>
  );
}
