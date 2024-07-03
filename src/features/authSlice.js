import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    user: null,
    authStatus : false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser : (state, action) => {
            if(action.payload){
                state.authStatus = true; 
                state.user = action.payload;
            }
        }
    }
})

export const { setUser } = authSlice.actions;

export default  authSlice.reducer;