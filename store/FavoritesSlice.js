import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
  },
  reducers: {
    addToFavorite: (state, action) => {
      const itemInFavorite = state.favorite.find(
        (item) => item.id == action.payload.id
      );
      if (!itemInFavorite) {
        state.favorite.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromFavorite: (state, action) => {
      const removeFromFavorite = action.payload;
      state.favorite = state.favorite.filter(
        (item) => item.id !== removeFromFavorite
      );
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
