import {message as _message} from "antd";
import {ChangeEvent, useState} from "react";
import {loadStickersFromFile} from "../store/todo-stickers-slice";
import {useAppDispatch} from "../store/store";
import {delay} from "../utils/utils.ts";


export const useStickerUpload = (stickerID: string) => {
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

                if(file.size > 1000000){
                    _message.open({
                        type: 'error',
                        content: `Превышен лимит размера файла ${file.size}byte`
                    })
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    })
                    return
                }

                if(file.type !== 'text/plain'){
                    console.log(file.type)
                    _message.open({
                        type: 'error',
                        content: `Некорректный формат файла ${file.type}!`
                    })
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    })
                    return
                }


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
                                content: `Загрузка успешна! ${file.name}`
                            })
                        }, 1000)
                    } catch (e) {
                        console.error(e)
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
                    console.error(reader.error)
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

    const handleDownloadSticker = (title: string, content: string | null, format: string = 'plain/text') => {
        const link = document.createElement('a');

        try {
            
            link.download = `file-${title}.${format.split('/')[1]}`
            const blob = new Blob([content!], {type: format})
            link.href = URL.createObjectURL(blob)

            _message.open({
                type: 'success',
                content: 'Создание файла...',

            }).then(() => {
                link.click();
                delay(10000).then(() => {
                    URL.revokeObjectURL(link.href);

                })

            })



        } catch (e) {
            _message.open({
                type: 'error',
                content: 'Ошибка создания копии!',

            })
        }


    }
    return {
        ...state,
        handleUploadSticker,
        handleDownloadSticker
    }

}