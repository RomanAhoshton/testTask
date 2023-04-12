import React from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Foundation } from '@expo/vector-icons';
import { removeFromFavorite } from "./store/FavoritesSlice";


export default function FavoritesScreen() {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.favorite);

  if  (favorite) {
    return (
    
      <ScrollView>
        {favorite.map((item) => {
          return (
            <View style={styles.container}>
              <View style={styles.card}>
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.thumbnailUrl }}
                  />
                </View>
                <View style={styles.textLike}>
                  <Text style={styles.text}>
                    {item.id}
                    {"."}
                    {item.title.toUpperCase()}
                  </Text>
                  <Text style={styles.icons}>
                    <Foundation
                      name="dislike"
                      size={35}
                      color="#28ebd7"
                      onPress={() => dispatch(removeFromFavorite(item.id))}
                    />
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderColor: "#28ebd7",
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    margin: 10,
    minWidth: 370,
    borderWidth: 3,
    borderColor: "#28ebd7",
    backgroundColor: "white",
    maxWidth: 370,
  },
  text: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 140,
    color: "#28ebd7",
  },
  image: {
    width: 150,
    height: 150,
    display: "flex",
    alignSelf: "flex-end",
  },
  main: {
    backgroundColor: "white",
  },
  icons: {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    maxWidth: 150,
  },
  textLike: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
