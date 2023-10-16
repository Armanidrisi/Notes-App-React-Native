import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NoteCard({ note }) {
  const navigation = useNavigation();

  function randomLightColorHex() {
    const r = Math.floor(Math.random() * 156 + 100).toString(16); // R component in hex
    const g = Math.floor(Math.random() * 156 + 100).toString(16); // G component in hex
    const b = Math.floor(Math.random() * 156 + 100).toString(16); // B component in hex
    return `#${r}${g}${b}`;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: randomLightColorHex(),
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 10,
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("View", note)}
    >
      <Text
        style={{ fontSize: 20, paddingHorizontal: 20, fontWeight: "bold" }}
        numberOfLines={4}
        ellipsizeMode="tail"
      >
        {note.title}
      </Text>
    </TouchableOpacity>
  );
}
