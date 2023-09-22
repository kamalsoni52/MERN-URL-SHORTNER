import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, accessToken: null, role: null},
    reducers:{
        setCredential : (state, action) =>{
            const {user, accessToken, role} = action.payload
            state.user = user
            state.accessToken = accessToken
            state.role = role
        },
        logOut: (state,action) => {
            state.user = null
            state.accessToken = null
            state.role = null
        }
    },
})

export const { setCredential,  logOut} = authSlice.actions

export default authSlice.reducer

export const selectUser = (state) => state.auth.user 
export const selectAccessToken = (state) => state.auth.accessToken 
export const selectRole = (state) => state.auth.role 
