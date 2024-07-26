import { Task } from "../../features/Todo/Todo.interface";

export interface TodoState{
    list:Task[];
    isLoading:boolean;
}