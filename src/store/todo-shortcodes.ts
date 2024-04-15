import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LS } from "../hooks/hooks"

type TodoShortCodesStateType = {
    shortcodes: Array<ShortCodesType>
}

export type ShortCodesType = {
    id: string,
    key: string,
    name: string,
    meaning: string
}

const initialState: TodoShortCodesStateType = {
    shortcodes: [
        {
            id: 'default-1',
            key: 'def1',
            name: '[hello-world]',
            meaning: 'Привет мир!'
        },
        {
            id: 'default-2',
            key: 'def2',
            name: '[dev]',
            meaning: 'I love developing'
        },
    ],
}

const {save, get, exist} = LS()

const todoShortCodesSlice = createSlice({
    name: 'todo-shortcodes',
    initialState,
    reducers: {
        initShortCodes(state: TodoShortCodesStateType) {

            if(exist('shortcodes')) {
                state.shortcodes = get('shortcodes')
            }
        },
        addShortCode(state: TodoShortCodesStateType, action: PayloadAction<{name: string, meaning: string, id: string, key: string}>) {
            
            state.shortcodes.push(action.payload)
            save('shortcodes', state.shortcodes)
        },

        deleteShortCode(state: TodoShortCodesStateType, action: PayloadAction<{id: string}>) {

            state.shortcodes = state.shortcodes.filter(shortcode => shortcode.id !== action.payload.id)
            save('shortcodes', state.shortcodes)
        }

    },
})

export default todoShortCodesSlice.reducer
export const {addShortCode, deleteShortCode, initShortCodes} = todoShortCodesSlice.actions

