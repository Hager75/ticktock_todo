import { Task,TaskFormInputs,TaskRes } from "../../features/Todo/Todo.interface";

export interface TodoState{
    list:Task[];
    isLoading:boolean;
    task:TaskRes | null;
}

export interface EditTaskPayload {
    data: TaskFormInputs;
    id: string;
}