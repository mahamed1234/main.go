import { TextInput } from "react-native";
import { S } from "./Searchbar.style.js";

export function Searchbar({ onSubmit }) {
  return (
    <TextInput
      onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
      style={S.input}
      placeholder="Chercher une ville... Ex: Paris"
    />
  );
}