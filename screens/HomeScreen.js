import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Search, AlertCircle, Plus } from "react-native-feather";
import { StatusBar } from "expo-status-bar";
import colors from "../constants/colors";
import NoteCard from "../components/NoteCard";
import NoteContext from "../context/noteContext";

export default function HomeScreen({ route, navigation }) {
  const { notes, loading, fetchNotes } = useContext(NoteContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchNotes();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <StatusBar style="light" />
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
          <Text
            style={{
              fontSize: 43,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            Notes
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                borderRadius: 15,
                backgroundColor: "#3b3b3b",
                justifyContent: "center",
                alignItems: "center",
                elevation: 10,
              }}
            >
              <Search stroke="#fff" width={18} height={18} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                borderRadius: 15,
                backgroundColor: "#3b3b3b",
                justifyContent: "center",
                alignItems: "center",
                elevation: 10,
              }}
            >
              <AlertCircle stroke="#fff" width={18} height={18} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={colors.white} />
          </View>
        ) : notes.length > 0 ? (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <NoteCard note={item} />}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("../assets/images/note.png")}
              style={{ width: 300, height: 280 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "300",
                color: colors.white,
                marginTop: 5,
              }}
            >
              Create your first note!
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            position: "absolute",
            bottom: 50,
            right: 20,
            height: 60,
            backgroundColor: "black",
            borderRadius: 100,
            elevation: 50,
          }}
          onPress={() => {
            navigation.navigate("Add");
          }}
        >
          <Plus stroke="#fff" width={40} height={40} />
        </TouchableOpacity>
      </View>
    </>
  );
}
