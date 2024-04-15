import {configureStore} from "@reduxjs/toolkit";
import TodosReducer from './todo-slice'
import TodosPalleteReducer from './todo-pallete-options-slice'
import TodosFrameReducer from './todo-frames-slice'
import TodosStickerReducer from './todo-stickers-slice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import TodoShortCodesReducer from './todo-shortcodes'

export const store = configureStore({
    reducer: {
        todos: TodosReducer,
        todoPalleteOptions: TodosPalleteReducer,
        todoFrames: TodosFrameReducer,
        todoStickers: TodosStickerReducer,
        todoShortcodes: TodoShortCodesReducer
    },

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
