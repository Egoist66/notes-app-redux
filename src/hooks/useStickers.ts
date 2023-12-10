import {useAppDispatch} from "./hooks";
import {useToggle} from "@react-hooks-library/core";
import {ChangeEvent, RefObject, useEffect, useRef, useState} from "react";
import {createStickerContent, deleteSticker, editStickerTitle, toggleSticker} from "../redux/todo-stickers-slice";
import {message} from "antd";

type StickersStateType = {
    fieldStatus: 'error' | 'warning' | ''
    newTitle: string
    contentData: string | null
    maxContentDataValue: number
    emptyCount: number,
    showRawHTML: boolean


}

export const useStickers = (id: string, content: string, title: string) => {
    const dispatch = useAppDispatch()

    const {setTrue, setFalse, bool} = useToggle(false)
    const uploadRef = useRef<HTMLInputElement>(null)
    const areaRef = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<StickersStateType>({
        fieldStatus: '',
        newTitle: title,
        contentData: '',
        emptyCount: 0,
        maxContentDataValue: 10000,
        showRawHTML: false
    })

    const uploadSticker = () => {
        if (uploadRef.current) {
            uploadRef.current.click()
        }
    }

    const onNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, newTitle: e.currentTarget.value})
    }
    const onDeleteSticker = (stickerId: string) => {
        return () => {
            dispatch(deleteSticker({id: stickerId}))
            message.open({
                type: 'warning',
                content: 'Стикер удален!'
            })
        }
    }

    const toggleStickerItem = (stickerId: string) => {
        return () => {
            dispatch(toggleSticker({id: stickerId}))
        }
    }

    const saveNewTitle = () => {
        if (!state.newTitle.length) {
            message.open({
                type: 'error',
                content: 'Пустое значение!'
            })
            return
        } else if (title === state.newTitle) {
            message.open({
                type: 'warning',
                content: 'Одниковые значения - сохранено по дефолту!'
            })
            setFalse()

            return;
        }

        dispatch(editStickerTitle({id, newtitle: state.newTitle}))
        message.open({
            type: 'success',
            content: 'Изменено!'
        })
        setFalse()
    }

    const onSwitchHtmlByClickMode = () => {
        setState((prevState) => ({
            ...prevState,
            showRawHTML: !prevState.showRawHTML
        }))
    }

    const onInputContent = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, contentData: e.currentTarget.textContent})
    }

    const onSwitchHtmlByBlurMode = () => {
        setState((prevState) => ({
            ...prevState,
            showRawHTML: false,
            emptyCount: prevState.emptyCount + 1
        }))
    }
    const showRawHTML = (mode: 'textContent' | 'innerHTML') => {
        if (areaRef.current) {
            areaRef.current[mode] = content
        }
    }

    const saveStickerContent = (id: string) => {
        if (id) {
            dispatch(createStickerContent({content: state.contentData ? state.contentData : '', id}))

            message.open({
                type: 'success',
                content: 'Стикер сохранен!'
            })
        } else {
            message.open({
                type: 'error',
                content: 'Невозможно сохранить стикер!'
            })
        }


    }

    const deleteStickerContent = (id: string) => {
        return () => {
            if (content === '') {
                message.open({
                    type: 'warning',
                    content: 'Пусто!'
                })

                return
            }
            dispatch(createStickerContent({content: '', id}))
            message.open({
                type: 'success',
                content: 'Очищено!'
            })
        }
    }

    useEffect(() => {
        if (state.showRawHTML) {
            console.log(state.showRawHTML);

            showRawHTML('textContent')
        } else {
            console.log(state.showRawHTML);

            showRawHTML('innerHTML')
        }
    }, [state.showRawHTML])

    useEffect(() => {
        if (state.contentData) {
            if (state.contentData.length >= state.maxContentDataValue) {
                message.open({
                    type: 'warning',
                    content: 'Превышен лимит количества символов! Чрезмерное кол-во данных влияет на производительность '
                })
            }
        }


    }, [state.contentData?.length])

    useEffect(() => {
        setState({
            ...state,
            contentData: content
        })
    }, [content])


    useEffect(() => {

        if (state.contentData === content) {
            return
        }

        if (state.emptyCount === 1 && state.contentData === '') {
            saveStickerContent(id)
            return

        }

        if (state.contentData !== '') {
            saveStickerContent(id)
            return

        }


    }, [state.emptyCount])

    return {
        uploadRef,
        uploadSticker,
        onDeleteSticker,
        areaRef,
        deleteStickerContent,
        toggleSticker,
        bool,
        saveNewTitle,
        setFalse,
        setTrue,
        saveStickerContent,
        onSwitchHtmlByBlurMode,
        onSwitchHtmlByClickMode,
        onInputContent,
        toggleStickerItem,
        onNewTitle,
        setState,
        state,
        ...state,

    }

}