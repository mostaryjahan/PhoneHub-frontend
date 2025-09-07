import storage from "redux-persist/lib/storage"
import authReducer from "../features/auth/authSlice";
import { baseApi } from "@/redux/api/baseApi";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./Cart/CartApi";


const persistConfig ={
    key:'auth',
    storage,
    // whitelist: ["auth"]
}

const persistedAuthReducer = persistReducer(persistConfig,authReducer);

export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]:baseApi.reducer,
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
        serializableCheck:{
            ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,REGISTER],
        }
   
    }).concat(baseApi.middleware, cartApi.middleware)
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)