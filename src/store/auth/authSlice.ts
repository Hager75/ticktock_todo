import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserInfo } from "./auth.interface";
import { clearUserInStorage, setUserInStorage } from "../../utils/Helpers";
import { axiosInstance } from "../../network/axios";


const initialState: AuthState = {
    userInfo:
        JSON.parse(localStorage.getItem("user") as string) ||
        JSON.parse(sessionStorage.getItem("user") as string) ||
        null,
    isLoading: false,
};

export const loginRequest = createAsyncThunk(
    "auth/login",
    async (data: { email: string; password: string, rememberMe: boolean }) => {
        //TODO: to use data in real api
        const fakeData = {
            username: 'emilys',
            password: 'emilyspass',
        }
        const response = await axiosInstance.post<UserInfo>("auth/login", fakeData);
        data.rememberMe ? setUserInStorage(response.data, "local")
            : setUserInStorage(response.data, "session");
        return response.data;

    }
);

export const logoutRequest = createAsyncThunk(
    "auth/logout",
    async () => {
        // await axiosInstance.post("auth/logout");
        clearUserInStorage();
    }
);

export const registerRequest = createAsyncThunk(
    "auth/register",
    async (data: { email: string; password: string, name: string, image?:any }) => {
        //TODO: to use data in real api
        const fakeData = {
            username: 'emilys',
            password: 'emilyspass',
        }
        const response = await axiosInstance.post<UserInfo>("auth/register", fakeData);
        return response.data;

    }
);



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginRequest.fulfilled, (state, action: PayloadAction<UserInfo>) => {
                state.isLoading = false;
                state.userInfo = action.payload;
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
            })
            .addCase(logoutRequest.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(registerRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerRequest.fulfilled, (state, action: PayloadAction<UserInfo>) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(registerRequest.rejected, (state, action) => {
                state.isLoading = false;
            })


    },

});

export const { setUserInfo } =
    authSlice.actions;

export default authSlice.reducer;
