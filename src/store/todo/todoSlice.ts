import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TodoState } from "./todo.interface";
import { addTask, editTask, getList, getTaskDetails, removeTask } from "./todoThunks";
import { TaskRes } from "../../features/Todo/Todo.interface";


const initialState: TodoState = {
    list: [],
    isLoading: false,
    task:null,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        clearTodoState() {            
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getList.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(getList.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(removeTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeTask.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.list = state.list.filter(task => task.id !== action.payload.id);
            })
            .addCase(removeTask.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(addTask.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(editTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editTask.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.list = [...state.list,action.payload];
            })
            .addCase(editTask.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getTaskDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTaskDetails.fulfilled, (state, action: PayloadAction<TaskRes>) => {
                state.isLoading = false;
                state.task = action.payload;
            })
            .addCase(getTaskDetails.rejected, (state) => {
                state.isLoading = false;
            })
    },

});

export const { clearTodoState } =
    todoSlice.actions;

export default todoSlice.reducer;
