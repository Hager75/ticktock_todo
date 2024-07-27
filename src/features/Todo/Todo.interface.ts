export interface Task {
    id:number| string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}
export interface TaskRes extends Partial<Task>{
    id:number;
    completed: string;
    todo: string;
    userId: string;
}
export interface TaskFormInputs {
    title: string;
    description: string;
    dueDate: string;
    status:string;
}