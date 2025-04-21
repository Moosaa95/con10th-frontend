import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer, GlobalReducer, ModalReducer, MobileToggleReducer } from "./features/slices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./services/apiSlice";


export const store =  configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthReducer,
        generalModal: ModalReducer,
        global: GlobalReducer,
        mobileToggle: MobileToggleReducer,

    },
    middleware: getDefaultMiddleware => 
            getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export type AppStore = typeof store;
export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch']
