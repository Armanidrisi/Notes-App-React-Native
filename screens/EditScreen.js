import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Save, ArrowLeft, Eye } from "react-native-feather";
import colors from "../constants/colors";
import NoteContext from "../context/noteContext";

export default function EditScreen({ navigation, route }) {
  const { editNote } = useContext(NoteContext);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    
    setTitle(route.params.title);
    setContent(route.params.content);
  }, [route.params.title, route.params.content]);

  const handleEditNote = async () => {
    const id = route.params.id;
    const edited = await editNote(id, title, content);

    if (edited) {
      navigation.navigate("Home");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
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
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowLeft stroke="#fff" width={18} height={18} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 43,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              Edit Note
            </Text>
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
              onPress={handleEditNote}
            >
              <Save stroke="#fff" width={18} height={18} />
            </TouchableOpacity>
          </SafeAreaView>

          <View
            style={{
              padding: 20,
            }}
          >
            <TextInput
              multiline
              placeholder="Title"
              placeholderTextColor="#3b3b3b"
              style={{
                fontSize: 40,
                color: colors.white,
                marginBottom: 10,
              }}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            <TextInput
              placeholder="Type something..."
              multiline
              placeholderTextColor="#3b3b3b"
              style={{
                color: colors.white,
                fontSize: 18,
                letterSpacing: 2,
                lineHeight: 25,
                marginBottom: 10,
              }}
              value={content}
              onChangeText={(text) => setContent(text)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
