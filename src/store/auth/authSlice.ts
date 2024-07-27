import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import { AuthState, ProfileInfo, UserInfo } from "./auth.interface";
import { clearUserInStorage, getStorageType, getUserInfoInStorage, setUserInStorage } from "../../utils/Helpers";
import { getProfileInfo, loginRequest, logoutRequest, registerRequest, updateProfile } from "./authThunks";


const initialState: AuthState = {
    userInfo:getUserInfoInStorage(),
    profileInfo:null,
    isLoading: false,
};

const handleUserInfoUpdate = (state: AuthState, userInfo: UserInfo) => {
    state.userInfo = {...state.userInfo, ...userInfo};
    setUserInStorage(userInfo, getStorageType());
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginRequest.fulfilled, (state, action: PayloadAction<UserInfo>) => {
                state.isLoading = false;
                state.userInfo = action.payload;
                handleUserInfoUpdate(state, action.payload);
                toast.success("Logged in successfully!");
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(logoutRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutRequest.fulfilled, (state) => {
                state.isLoading = false;
                state.userInfo = null;
                toast.success("Logout successfully!");
                clearUserInStorage();
            })
            .addCase(logoutRequest.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(registerRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerRequest.fulfilled, (state) => {
                state.isLoading = false;
                toast.success("Registered successfully!");
            })
            .addCase(registerRequest.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserInfo>) => {
                state.isLoading = false;
                handleUserInfoUpdate(state, action.payload);
                toast.success("ypur profile updated successfully!");
            })
            .addCase(updateProfile.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getProfileInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfileInfo.fulfilled, (state, action: PayloadAction<ProfileInfo>) => {
                state.isLoading = false;
                state.profileInfo = action.payload;
            })
            .addCase(getProfileInfo.rejected, (state) => {
                state.isLoading = false;
            })


    },

});

export default authSlice.reducer;
