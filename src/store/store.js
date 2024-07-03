import { configureStore } from "@reduxjs/toolkit";  
import authSlice from "../features/authSlice";
import channelSlice from '../features/channelSlice'
import uiSlice from '../features/uiSlice'
import videoSlice from '../features/videoSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        video : videoSlice,
        ui: uiSlice,
        channel : channelSlice
    }
})