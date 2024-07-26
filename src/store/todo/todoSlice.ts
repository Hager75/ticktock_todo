import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../network/axios";
import { TodoState } from "./todo.interface";


const initialState: TodoState = {
    list: [],
    isLoading: false,
};

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


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        clearTodoState(state) {
            state = initialState;
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
                console.log(state, action.payload);

                state.isLoading = false;
                state.list = state.list.filter(task => task.id !== action.payload.id);
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.isLoading = false;
            })
    },

});
export const { clearTodoState } =
    todoSlice.actions;

export default todoSlice.reducer;
