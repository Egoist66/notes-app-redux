import {message as _message, message, UploadProps} from "antd";
import {LS, useAppDispatch} from "./hooks";
import {ChangeEvent, useState} from "react";
import {createStickerContent, loadStickersFromFile} from "../redux/todo-stickers-slice";


export const useStickerUpload = (stickerID: string) => {
    const {save, get} = LS()
    const dispatch = useAppDispatch()
    const [state, setState] = useState<{ loading: boolean, error: boolean }>({
        loading: false,
        error: false,
    })

    const handleUploadSticker = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {


            const file = e.currentTarget.files[0]
            const reader = new FileReader()
            reader.readAsText(file)
            console.log(file)

            reader.onload = () => {
                setState({
                    ...state,
                    error: false,
                    loading: true
                })

                const data = reader?.result
                if (data) {
                    try {
                        const timer = setTimeout(() => {
                            dispatch(loadStickersFromFile({id: stickerID, data}))
                            setState({
                                ...state,
                                loading: false
                            })
                            clearTimeout(timer)
                            _message.open({
                                type: 'success',
                                content: 'Загрузка успешна!'
                            })
                        }, 1000)
                    } catch (e) {
                        console.log(e)
                        setState({
                            ...state,
                            error: true,
                            loading: false
                        })
                        _message.open({
                            type: 'error',
                            content: 'Ошибка загрузки!'
                        })
                    }


                }

                reader.onerror = () => {
                    console.log(reader.error)
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    })
                    _message.open({
                        type: 'error',
                        content: 'Ошибка загрузки!'
                    })
                }

            }


        }

    }

    const handleDownloadSticker = (title: string, content: string) => {
        const link = document.createElement('a');

        try {
            link.download = `sticker-${title}.txt`
            const blob = new Blob([content], {type: 'text/plain'})
            const dataUrl = URL.createObjectURL(blob)
            link.href = dataUrl

            _message.open({
                type: 'success',
                content: 'Файл сформирован!',

            })


            link.click();
        } catch (e) {
            _message.open({
                type: 'error',
                content: 'Ошибка создания копии!',

            })
        }


        URL.revokeObjectURL(link.href);
    }
    return {
        ...state,
        handleUploadSticker,
        handleDownloadSticker
    }

}