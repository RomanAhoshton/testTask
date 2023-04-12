import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  includes,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite } from "./store/FavoritesSlice";
import { Foundation } from '@expo/vector-icons'; 
import { removeFromFavorite } from "./store/FavoritesSlice";


export default function PhotosScreen() {
  const favorite = useSelector((state) => state.favorite.favorite);
  const favoriteids = favorite.map((item) => item.id);
  const addItemToFavorite = (item) => {
    dispatch(addToFavorite(item));

    
  };

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [filteredData, setfilteredData] = useState([]);

  const url1 = "https://jsonplaceholder.typicode.com/photos?albumId=1";

  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  const fetchPosts = () => {
    fetch(url1)
      .then((response) => response.json())
      .then((responseJson) => {
        setfilteredData(responseJson);
        setData(responseJson);
      })
      .catch((error) => console.error(error));
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Image style={styles.image} source={{ uri: item.thumbnailUrl }} />
          </View>
          <View style={styles.textLike}>
            <Text style={styles.text}>
              {item.id}
              {"."}
              {item.title.toUpperCase()}
            </Text>
            <Text style={styles.icons}>
              {favoriteids.includes(item.id) ? (
                <Foundation name="dislike" size={35} color="#28ebd7"  onPress={() => dispatch(removeFromFavorite(item.id))}/>
              ) : (
                <Foundation 
                  onPress={() => addItemToFavorite(item)}
                  name="like"
                  size={35}
                  color="#28ebd7"
                />
              )}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();

        const textData = text.toUpperCase().trim();
     
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData(data);
      setsearch(text);
    }
  };

  return (
    <ScrollView style={styles.main}>
      <TextInput
        style={styles.input}
        value={search}
        placeholder="Search Here"
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
    </ScrollView>
  );
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
