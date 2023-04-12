import { configureStore, combineReducers } from "@reduxjs/toolkit";
import FavoriteReducer from "./FavoritesSlice";

import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["favorite"],
};

const rootReducer = combineReducers({
  favorite: FavoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
