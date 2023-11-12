import {createSlice} from "@reduxjs/toolkit";
import {LS} from "../hooks/hooks";

const {save, ls, get, remove, exist} = LS()

type StickersElems = {
    id: string,
    date: string,
    title: string,
    content: string

}

type initialStateType = {
    stickers: Array<StickersElems>
}

type addStickerAction = {
    payload: {
        title: string,
        date: string,

    }
}

type deleteStickerAction = {
    payload: {
        id: string
    }
}

type editStickerTitleAction = {
    payload: {
        newtitle: string,
        id: string,

    }
}

type addStickerContent = {
    payload: {
        content: string
        id: string

    }
}



const initialState: initialStateType = {
    stickers: []
}




const todoStickersSlice = createSlice({
    name: 'todo-stickers',
    initialState,
    reducers: {

        createSticker(state: initialStateType, action: addStickerAction) {
            state.stickers.push({
                date: action.payload.date,
                id: crypto.randomUUID(),
                title: action.payload.title,
                content: ''
            })
            save('stickers', state.stickers)
        },

        deleteSticker(state: initialStateType, action: deleteStickerAction) {
            state.stickers = state.stickers.filter(s => s.id !== action.payload.id)
            save('stickers', state.stickers)

        },

        editStickerTitle(state: initialStateType, action: editStickerTitleAction) {
            state.stickers = state.stickers.map(s => s.id === action.payload.id ? {
                ...s,
                title: action.payload.newtitle
            } : s)

            save('stickers', state.stickers)
        },

        loadStikersFromLS(state: initialStateType) {
            if (exist('stickers')) {
                state.stickers = get('stickers')
            }
        },

        createStickerContent(state: initialStateType, action: addStickerContent){
            state.stickers = state.stickers.map(s => s.id === action.payload.id ? {
                ...s,
                content: action.payload.content
            } : s)
            save('stickers', state.stickers)
        },


    }


})

export const {createSticker, createStickerContent, editStickerTitle, deleteSticker, loadStikersFromLS} = todoStickersSlice.actions

export default todoStickersSlice.reducer