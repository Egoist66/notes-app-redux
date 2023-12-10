import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LS} from "../hooks/hooks";

const { save, ls, get, remove, exist } = LS()

type StickersElems = {
    id: string,
    date: string,
    title: string,
    content: string
    timeStamp: number
    isOpened: boolean

}

type initialStateType = {
    stickers: Array<StickersElems>
}

type addStickerAction = {
    payload: {
        title: string,
        date: string,
        timestamp: number
        isOpened: boolean

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

type uploadStickerAction = {
    payload: {
        data: any,
        id: string
    }
}

type toggleStickerAction = {
    payload: {
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
                isOpened: action.payload.isOpened || false,
                date: action.payload.date,
                timeStamp: action.payload.timestamp,
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

        deleteAllStickers(state: initialStateType){
            state.stickers = []
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

        createStickerContent(state: initialStateType, action: addStickerContent) {
            state.stickers = state.stickers.map(s => s.id === action.payload.id ? {
                ...s,
                content: action.payload.content
            } : s)
            save('stickers', state.stickers)
        },

        loadStickersFromFile(state: initialStateType, action: uploadStickerAction) {
            state.stickers = state.stickers.map((s: any) => s.id === action.payload.id ? {
                ...s,
                content: action.payload.data
            } : s)
            save('stickers', state.stickers)


        },

        toggleSticker(state: initialStateType, action: toggleStickerAction) {
            state.stickers = state.stickers.map((s: any) => s.id === action.payload.id ? {
                ...s,
                isOpened: !s.isOpened
            } : s)
            save('stickers', state.stickers)
        },

        sortStickers(state, action: PayloadAction<{ mode: 'По названию' | 'По дате' }>) {
            switch (action.payload.mode) {
                case 'По дате': {
                    state.stickers = state.stickers.sort((a, b) => a.timeStamp - b.timeStamp)
                    return state
                }
                case 'По названию': {

                    state.stickers = state.stickers.sort((a, b) => a.title.localeCompare(b.title, undefined, {
                        sensitivity: 'base'
                    }))
                    return state
                }
            }
        },


    }


})

export const {
    createSticker,
    sortStickers,
    loadStickersFromFile,
    createStickerContent,
    editStickerTitle,
    deleteSticker,
    toggleSticker,
    deleteAllStickers,
    loadStikersFromLS
} = todoStickersSlice.actions

export default todoStickersSlice.reducer