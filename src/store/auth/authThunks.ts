import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../network/axios";
import { getUserInfoInStorage, setUserInStorage } from "../../utils/Helpers";
import { UserInfo } from "./auth.interface";
import { StorageType } from "../../utils/interfaces";

export const loginRequest = createAsyncThunk(
    "auth/login",
    async (data: { email: string; password: string, rememberMe: boolean }) => {
        //TODO: to use data in real api
        const fakeData = {
            username: 'emilys',
            password: 'emilyspass',
        }
        const response = await axiosInstance.post<UserInfo>("auth/login", fakeData);
        data.rememberMe ? setUserInStorage(response.data, StorageType.Local)
            : setUserInStorage(response.data, StorageType.Session);
        return response.data;

    }
);

export const logoutRequest = createAsyncThunk(
    "auth/logout",
    async () => {
        //this is a simulation of api request 
        await axiosInstance.post("http/200");
        // await axiosInstance.post("auth/logout");
    }
);

export const registerRequest = createAsyncThunk(
    "auth/register",
    async (data: FormData) => {
        //this is a simulation of api request 
        await axiosInstance.post("http/200");
        // const response = await axiosInstance.post<UserInfo>("auth/register", data);
        return;
    }
);

export const updateProfile = createAsyncThunk(
    "profile/update",
    async (data: FormData) => {
        // this is simulation for api 
        await axiosInstance.post("http/200");
        let user = getUserInfoInStorage();
        user.username = data.get("name")?.toString() || 'Ahmed Mohamed';
        user.email = data.get("email")?.toString() || 'expmale@gmail.com';
        user.image = !data.has("image") ? '' : user.image;
        return user
        // const response = await axiosInstance.post<UserInfo>("profile/update", data);
        // return response.data;
    }
);

export const getProfileInfo = createAsyncThunk(
    "profile/me",
    async () => {
        // this is simulation for api 
       const response = await axiosInstance.get("auth/me");
        return response.data
    }

);