import {useToggle} from "@react-hooks-library/core";
import {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import {createStickerContent, deleteSticker, editStickerTitle, toggleSticker} from "../store/todo-stickers-slice";
import {message} from "antd";
import {makeSelection} from "../utils/utils";
import { useAppDispatch } from "../store/store";

type StickersStateType = {
    fieldStatus: 'error' | 'warning' | ''
    newTitle: string
    contentData: string | null
    maxContentDataValue: number
    emptyCount: number,
    showRawHTML: boolean


}

export const useSticker = (id: string, content: string | null, title: string) => {
    const dispatch = useAppDispatch()

    const {setTrue, setFalse, bool} = useToggle(false)
    const uploadRef = useRef<HTMLInputElement>(null)
    const areaRef = useRef<HTMLDivElement>(null)
    const clickRef = useRef<HTMLDivElement>(null)

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

    const setStickerFullScreen = () => {
        if (areaRef.current) {
            areaRef.current.requestFullscreen({navigationUI: 'show'})
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
            ...state,
            showRawHTML: !prevState.showRawHTML
        }))
    }

    const onInputContent = (e: ChangeEvent<HTMLDivElement>) => {
        setState({...state, contentData: state.showRawHTML ? e.currentTarget.textContent : e.currentTarget.innerHTML})


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
            areaRef.current[mode] = content!
        }
    }

    const saveStickerContent = (id: string) => {
        if (id) {

            dispatch(createStickerContent({content: state.contentData, id}))

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
        showRawHTML(state.showRawHTML ? 'textContent' : 'innerHTML')

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


    const makeTextDecoration = (e: KeyboardEvent<HTMLDivElement>) => {

        if (e.ctrlKey && e.key === 'b') {
            makeSelection('b', areaRef, dispatch, id)
            return
        }

        if (e.ctrlKey && e.key === 'i') {
            makeSelection('i', areaRef, dispatch, id)
            return
        }

        if (e.ctrlKey && e.key === 'm') {
            makeSelection('mark', areaRef, dispatch, id)
            return
        }
        if (e.ctrlKey && e.key === 'l') {
            makeSelection('a', areaRef, dispatch, id)
            return
        }
        if (e.ctrlKey && e.key === 'f') {
            setStickerFullScreen()
        }

    }

    const highLightLink = (flag: boolean) => {
        return () => {
            if (areaRef.current) {
                areaRef.current.contentEditable = String(flag)
            }
        }
    }


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

        if (state.emptyCount >= 1 && state.contentData === '') {
            saveStickerContent(id)
            return

        }

        if (state.contentData !== '') {
            saveStickerContent(id)
            return

        }


    }, [state.emptyCount])


    useEffect(() => {
        if (areaRef.current) {
            const link = areaRef.current.querySelector('a')
            if (link) {
                link.addEventListener('mouseover', highLightLink(false))
                link.addEventListener('mouseout', highLightLink(true))


            }
        }

        return () => {
            if (areaRef.current) {
                const link = areaRef.current.querySelector('a')
                if (link) {
                    link.removeEventListener('mouseover', highLightLink(true))
                    link.removeEventListener('mouseout', highLightLink(true))

                }

            }
        }
    }, [content])


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
        clickRef,
        makeTextDecoration,
        state,
        ...state,

    }

}