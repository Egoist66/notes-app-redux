import { MouseEvent, useState } from "react";
import {useAppDispatch} from "./hooks";
import {deleteItems, editTask, toggleComplete} from "../redux/todo-slice";
import {message} from "antd";
import Swal from "sweetalert2";
import {TaskItemState} from "../components/TaskItem";

export const useTaskItems = () => {

    const [state, setState] = useState<TaskItemState>({
        editMode: false,
        isPopupEnabled: false,
        isContextMenuEnabled: false,
    })

    const {isPopupEnabled, isContextMenuEnabled, editMode} = state


    const dispatch = useAppDispatch();

    const deleteTask = (id: number) => {
        console.log(id);
        dispatch(deleteItems(id));

        if (id) {
            message.open({
                type: 'warning',
                content: 'Заметка удалена',

            })
        }
    };

    const enableEditMode = () => {
        setState({
            ...state,
            editMode: !editMode
        })
    };


    const togglePopup = () => {

        setState({
            ...state,
            isPopupEnabled: true
        })
    };

    const toggleContextMenu = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();

        setState({
            ...state,
            isContextMenuEnabled: true
        })

    };


    const toggleTask = (id: number) => {
        dispatch(toggleComplete(id));
    };


    const initEditMode = (title: string, id: number) => {
        if (editMode) {
            Swal.fire({
                title: "Введите новое значение",
                input: 'text',
                inputValue: title,
                showCancelButton: true,
                confirmButtonText: 'Сохранить',
                cancelButtonText: 'Отменить',
                cancelButtonColor: '#1677FF',
                confirmButtonColor: '#1677FF',
                didClose() {
                    setState({
                        ...state,
                        editMode: false
                    })
                },
                inputValidator: (value) => {
                    if (!value.trim().length) {

                        return 'Пустое значение запрещено!'

                    } else {
                        dispatch(editTask({id, newText: value}));
                        setState({
                            ...state,
                            editMode: false
                        })
                    }
                }
            })

        }
    };

    return {
        deleteTask,
        editMode,
        initEditMode,
        toggleTask,
        enableEditMode,
        togglePopup,
        toggleContextMenu,
        isContextMenuEnabled,
        isPopupEnabled,
        state,
        setState

    }

}