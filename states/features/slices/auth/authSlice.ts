/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSlice} from "@reduxjs/toolkit"
interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    id: string | null
    pendingVerificationEmail: string | null
}


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    pendingVerificationEmail: null,
    id: localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id") as string) : null
} as AuthState


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, id) => {
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            state.id = id.payload;
            localStorage.setItem("id", JSON.stringify(state.id));
        },
        logout: state => {
            state.isAuthenticated = false 
            localStorage.setItem("isAuthenticated", JSON.stringify(false));
        },
        finishInitialLoad: state => {
            state.isLoading = false;
        },
        setPendingVerificationEmail: (state, action) => {
            state.pendingVerificationEmail = action.payload
          },
          clearPendingVerificationEmail: (state) => {
            state.pendingVerificationEmail = null
          }
    }
})


export const {
    setAuth, 
    logout, 
    finishInitialLoad, 
    setPendingVerificationEmail, 
    clearPendingVerificationEmail 
} = authSlice.actions;

export default authSlice.reducer;


export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectIsLoading = (state: any) => state.auth.isLoading;
export const selectUserId = (state: any) => state.auth.id;