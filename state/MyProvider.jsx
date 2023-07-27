"use client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import authReducer from "@state";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(key) {
      if (typeof key !== "string") {
        throw new Error("Key must be a string");
      }
      return Promise.resolve(null);
    },
    setItem(key, value) {
      if (typeof key !== "string") {
        throw new Error("Key must be a string");
      }
      return Promise.resolve(value);
    },
    removeItem(key) {
      if (typeof key !== "string") {
        throw new Error("Key must be a string");
      }
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["mode"],
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const MyProvider = ({ children }) => {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default MyProvider;
