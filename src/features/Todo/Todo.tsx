import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    List, ListItem, ListItemText, IconButton, Typography,
    Collapse,
    CircularProgress
} from '@mui/material';
import { Add, Delete, ReportProblemRounded, ErrorOutlineRounded, BorderColorRounded } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';

import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import { ROUTE_PATHS } from '../../utils/RoutesPaths';
import TruncateText from '../../components/TruncateText/TruncateText';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearTodoState } from '../../store/todo/todoSlice';
import { getList, removeTask } from '../../store/todo/todoThunks';
import { Task } from './Todo.interface';

const TodoList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const taskList = useAppSelector((state) => state.todo.list);
    const isLoading = useAppSelector((state) => state.todo.isLoading);

    const [deleteTaskModal, setDeleteTaskModal] = useState<{ isOpen: boolean; task: Task | null }>({ isOpen: false, task: null });

    useEffect(() => {
        dispatch(getList())
        return () => {
            dispatch(clearTodoState());
        };
    }, [dispatch]);


    const handleAddTask = () => {
        navigate(ROUTE_PATHS.addTask);
    };

    const handleEditTask = (task:Task) => {
        navigate(ROUTE_PATHS.editTask.replace(":id", task.id.toString()));
    }

    const handleConfirmDeleteModal = () => {
        dispatch(removeTask(deleteTaskModal.task?.id!));
        setDeleteTaskModal({ isOpen: false, task: null });
    };

    const handleCloseDeleteModal = () => {
        setDeleteTaskModal({ isOpen: false, task: null });
    };

    const handleDeleteTask = (taskToDelete: Task) => {
        setDeleteTaskModal({ isOpen: true, task: taskToDelete });
    };

    const renderItem = (task: any, handleDeleteTask: any) => {
        return (
            <ListItem key={task.id} className="bg-white dark:bg-grey-mid drop-shadow-md my-2 rounded-xl">
                <ListItemText
                    className='px-4 py-2'
                    primary={<span className="text-secondary font-semibold text-regular block mb-1">{task.title ?? task.todo}</span>}
                    secondary={
                        <>
                            <Typography component="span" variant="body2" className="text-general !text-sm">
                                <TruncateText
                                    text={task.description || "there is no description"}
                                    length={30}
                                />
                            </Typography>
                            <br />
                            Due: {task.dueDate ?? "6/10/2025"} | Status: {task.status ?? task.completed ? "completed" : "in progress"}
                        </>
                    }
                />
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task)}>
                    <BorderColorRounded color='action' />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task)}>
                    <Delete color='error' />
                </IconButton>
            </ListItem>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <Typography align="center" className="!font-semibold !text-xxl">
                    Todo List
                </Typography>
                <Button
                    label="Add Task"
                    type="button"
                    labelClass="text-sm font-semibold py-1"
                    className="!w-40 !rounded-2xl"
                    icon={<Add />}
                    onClick={handleAddTask}
                />
            </div>
            {taskList?.length === 0 && isLoading &&
                <div className='flex justify-center items-center h-56'>
                    <CircularProgress color="primary" />
                </div>
            }

            {taskList?.length === 0 && !isLoading &&
                <Typography className='flex justify-center items-center h-56 font-semibold !text-lg' color="secondary">
                    <ErrorOutlineRounded color='secondary' className='me-1' />   There is no tasks, you could add one
                </Typography>
            }
    
            <div>
                <List>
                    <TransitionGroup>
                        {taskList?.length > 0 && !isLoading && taskList.map((task) => (
                            <Collapse key={task.id}>{renderItem(task, handleDeleteTask)}</Collapse>
                        ))}
                    </TransitionGroup>
                </List>

            </div> 
            <Modal
                modalTitle={<span className="!text-xxl flex items-center"><ReportProblemRounded color="error" className='mx-2 !text-xxl' /> Alert!</span>}
                handleClose={() => { handleCloseDeleteModal() }}
                handleConfirm={() => { handleConfirmDeleteModal() }}
                open={deleteTaskModal.isOpen}
                mainText="Are you sure you want to delete this task?"
                primaryBtnTitle="Confirm"
                secondaryBtnTitle="Cancel"
            />
        </div>
    );
};

export default TodoList;
