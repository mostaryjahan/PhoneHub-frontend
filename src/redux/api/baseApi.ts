import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";
// import { PersistPartial } from "redux-persist/es/persistReducer";

const baseQuery = fetchBaseQuery({
   baseUrl: `${import.meta.env.VITE_API_URL}/api`,

    // credentials:"include",
    prepareHeaders:(headers, {getState})=>{
        const token =  (getState() as RootState).auth?.token;
        // console.log('token from redux',token);
        if(token){
            headers.set("authorization",`Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath:'baseApi',
    baseQuery:baseQuery,
    tagTypes:['cart','users','user'],
    endpoints:()=>({})
})