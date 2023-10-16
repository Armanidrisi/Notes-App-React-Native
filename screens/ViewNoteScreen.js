import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Edit, ArrowLeft, Trash } from "react-native-feather";
import { useContext } from "react";

import colors from "../constants/colors";
import NoteContext from "../context/noteContext";

export default function ViewNoteScreen({ navigation, route }) {
  const { deleteNote } = useContext(NoteContext);
  const { id, title, content } = route.params;

  const handleDeleteNote = async () => {
    //   alert(id);
    const deleted = await deleteNote(id);

    if (deleted) {
      navigation.goBack();
    }
  };

  const editNote = () => {
    navigation.navigate("Edit", { id, title, content });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <SafeAreaView
        style={{
          marginHorizontal: 30,
          marginVertical: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 15,
            backgroundColor: "#3b3b3b",
            justifyContent: "center",
            alignItems: "center",
            elevation: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft stroke="#fff" width={18} height={18} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 15,
              backgroundColor: "#3b3b3b",
              justifyContent: "center",
              alignItems: "center",
              elevation: 10,
            }}
            onPress={editNote}
          >
            <Edit stroke="#fff" width={18} height={18} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 15,
              backgroundColor: "#3b3b3b",
              justifyContent: "center",
              alignItems: "center",
              elevation: 10,
            }}
            onPress={handleDeleteNote}
          >
            <Trash stroke="#fff" width={18} height={18} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold", color: colors.white }}>
          {title}
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: colors.white,
            fontWeight: 300,
            fontSize: 18,
            letterSpacing: 2,
            lineHeight: 25,
          }}
        >
          {content}
        </Text>
      </ScrollView>
    </View>
  );
}
