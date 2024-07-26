import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircularProgress } from "@mui/material";

import { Option } from "../../../components/Select/Select.interface";
import { TaskFormInputs } from "../Todo.interface";

import { STATUS_VALUES } from "../../../utils/Constants";
import { ROUTE_PATHS } from "../../../utils/RoutesPaths";

import { useAppDispatch, useAppSelector } from "../../../store";
import { clearTodoState } from "../../../store/todo/todoSlice";
import { addTask, editTask, getTaskDetails } from "../../../store/todo/todoThunks";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import DatePicker from "../../../components/DatePicker/DatePicker";
import Select from "../../../components/Select/Select";

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    dueDate: yup.string().required("Due Date is required"),
    status: yup.string().required("Status is required"),
});

const statusOptions: Option[] = [
    {
        id: "1",
        label: "In progress",
    },
    {
        id: "2",
        label: "Completed",
    },
    {
        id: "3",
        label: "Todo",
    },
]
const AddEditTask = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const isLoading = useAppSelector(({ todo }) => todo.isLoading);
    const selectedTask = useAppSelector(({ todo }) => todo.task);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isValid },
    } = useForm<TaskFormInputs>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: "",
            status: "",
        },
    });

    useEffect(() => {
        if (id) {
            dispatch(
                getTaskDetails(+id)
            );
        }
    }, [id]);

    useEffect(() => {
        if (selectedTask && Object.keys(selectedTask).length) {
            const {
                todo,
                completed,
            } = selectedTask;
            const status = statusOptions.find(
                (status: Option) => (completed ? STATUS_VALUES.completed : STATUS_VALUES.inprogress) === status.id
            )?.id || STATUS_VALUES.inprogress;

            setValue("description", "This is dummy description");
            setValue("title", todo);
            setValue(
                "status",
                status.toString()
            );
            const day = String(new Date().getDate()).padStart(2, '0');
            const month = String(new Date().getMonth() + 1).padStart(2, '0');
            const year = new Date().getFullYear();

            setValue("dueDate", `${day}/${month}/${year}`);

        }
    }, [selectedTask]);

    useEffect(() => {
        return () => {
            dispatch(clearTodoState());
        };
    }, []);


    const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
        try {
            id ? await dispatch(editTask({ data, id })).unwrap() : await dispatch(addTask(data)).unwrap()
            navigate(ROUTE_PATHS.todo);
        } catch (err) {
            console.error('failed:', err);
        }
    };

    return (
        <div className="flex flex-1 w-full justify-center items-center">
            <div className="flex flex-col justify-center py-5 px-10 w-[35rem] max-w-full bg-general py-10 rounded-xl drop-shadow-md">
                <div>
                    <h2 className="text-primary text-lg font-bold mb-2">{id ? 'Edit' : "Add"} your Task</h2>
                </div>
                {id && isLoading &&
                    <div className='flex justify-center items-center h-56'>
                        <CircularProgress color="primary" />
                    </div>
                }

                {(((id && !isLoading) || !id )  &&
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    id="title"
                                    label="Title"
                                    type="text"
                                    name="task-title"
                                    placeholder="Enter your title"
                                    inputClass="my-1"
                                    labelClassName="my-1"
                                    inputWrapperClass="my-3"
                                    isInputHasErr={!!errors.title}
                                    errMsg={errors.title?.message}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    id="description"
                                    label="Description"
                                    type="text"
                                    name="task-description"
                                    placeholder="Enter your description"
                                    inputClass="mb-1"
                                    labelClassName="my-1"
                                    inputWrapperClass="mt-1"
                                    isInputHasErr={!!errors.description}
                                    errMsg={errors.description?.message}
                                    onChange={onChange}
                                    value={value}
                                    multiline
                                    rows={3}

                                />
                            )}
                        />
                        <Controller
                            name="dueDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    id="dueDate"
                                    label="Due Date"
                                    name="dueDate"
                                    isInputHasErr={!!errors.dueDate}
                                    errMsg={errors.dueDate?.message}
                                    onChange={onChange}
                                    value={value}
                                    disablePast={true}
                                />
                            )}
                        />
                        <Controller
                            name="status"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    label="Status"
                                    placeholder="Select task's status"
                                    name="status"
                                    id="status"
                                    options={statusOptions}
                                    onChange={(newStatus) => {
                                        onChange(newStatus?.id ?? null);
                                    }}
                                    value={
                                        statusOptions.find((option) => {
                                            return option.id === value;
                                        }) || null
                                    }
                                    hasError={!!errors.status?.message}
                                    errMsg={errors.status?.message}
                                />
                            )}
                        />

                        <div className="flex items-center justify-center">
                            <Button
                                label="Submit"
                                type="submit"
                                labelClass="py-1 mb-1 text-sm font-semibold"
                                className="!my-2 !w-52 !rounded-2xl"
                                disabled={!isDirty || !isValid || isLoading}
                            />
                        </div>
                    </form>
                )}
            </div>

        </div>)
}
export default AddEditTask;

