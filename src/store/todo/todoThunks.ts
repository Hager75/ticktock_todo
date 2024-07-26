import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../network/axios";
import { EditTaskPayload } from "./todo.interface";
import { TaskFormInputs, TaskRes } from "../../features/Todo/Todo.interface";

export const getList = createAsyncThunk(
    "todo/list",
    async () => {
        const response = await axiosInstance.get<any>("todos/random/8");
        return response.data;

    }
);

export const removeTask = createAsyncThunk(
    "todo/removeTask",
    async (id: number) => {
        const response = await axiosInstance.get<any>(`todos/${id}`);
        return response.data;
    }
);

export const getTaskDetails = createAsyncThunk(
    "todo/getTask", async (id: number) => {
        const response = await axiosInstance.get<any>(`todos/${id}`);
        return response.data;
    }
);

export const editTask = createAsyncThunk(
    "todo/editTask",
    async ({ data, id }: EditTaskPayload) => {
        //TODO: to replace dummyData with data with real apis
        const dummyData = {
            todo: data.title,
            completed: +data.status === 2,
        }
        const response = await axiosInstance.put<any>(`todos/${id}`, dummyData);
        return response.data;
    }
);

export const addTask = createAsyncThunk(
    "todo/addTask", async (data: TaskFormInputs) => {
    //TODO: to replace dummyData with data with real apis
        const dummyData = {
            todo: data.title,
            completed: +data.status === 2,
            userId: 5,
        }
        const response = await axiosInstance.post<TaskRes>(`todos/add`, dummyData);
        return response.data;
    }
);