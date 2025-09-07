import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser ={
    name:string;
    email:string;
    role:string;
    avatarUrl:string;
    iat:number;
    exp:number;
};

type TAuthState ={
    user:null | TUser;
    token:null | string;
};

const initialState: TAuthState = {
    user: JSON.parse(localStorage.getItem("authUser") || "null"),  // Load user from localStorage
    token: localStorage.getItem("authToken") || null,  // Load token from localStorage
  };

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            // console.log(action.payload);
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;

            // Save to localStorage
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", action.payload.token);
        },
        logout:(state)=>{
            state.user = null;
            state.token = null;

             // Remove from localStorage
            localStorage.removeItem("authUser");
            localStorage.removeItem("authToken");
        }
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken =(state:RootState) => state.auth.token;
export const selectCurrentUser =(state:RootState)=> state.auth.user;
