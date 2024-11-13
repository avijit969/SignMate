import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import fontSlice from '../features/font/fontSlice';
import themeSlice from '../features/theme/themeSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    fontSize: fontSlice,
    theme: themeSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
