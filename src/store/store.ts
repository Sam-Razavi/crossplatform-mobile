import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";

import { usersApi } from "./api/UsersApi";
import { postsApi } from "./api/PostsApi";
import authSlice from "./slices/authSlice";
import configSlice from "./slices/configSlice";
import { initializeI18n } from "../../i18n";

const middlewares = [usersApi.middleware, postsApi.middleware];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const persistConfig = {
  key: "crossplatform-mobile-v1.0.0",
  storage: AsyncStorage,
  whitelist: ["auth", "config"],
};

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  auth: authSlice,
  config: configSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }).concat(...middlewares),
});

export const persistor = persistStore(store, null, () => {
  const state = store.getState();
  initializeI18n(state.config.locale);
});


export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
