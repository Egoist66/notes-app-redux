import React, {FC, memo, useEffect, useRef, useState} from "react";
import {Button, Flex, Input, message} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {LS, useAppDispatch} from "../hooks/hooks";
import {createStickerContent, deleteSticker, editStickerTitle} from "../redux/todo-stickers-slice";
import {EditOutlined} from "@ant-design/icons";
import {useToggle} from "@react-hooks-library/core";
import {useStickerUpload} from "../hooks/useStickerUpload";

type StickersStateType = {
    fieldStatus: 'error' | 'warning' | ''
    newTitle: string
    content: string

}

type StickerItemProps = {
    id: string
    title: string
    content: string
}

export const StickerItem: FC<StickerItemProps> = memo(({id, content, title}) => {
    const {handleUploadSticker, handleDownloadSticker, loading} = useStickerUpload(id)
    const dispatch = useAppDispatch()

    console.log('render')

    const {setTrue, setFalse, bool} = useToggle(false)
    const uploadRef = useRef<HTMLInputElement>(null)
    const [state, setState] = useState<StickersStateType>({
        fieldStatus: '',
        newTitle: title,
        content: ''
    })

    const uploadSticker = () => {
        if (uploadRef.current) {
            uploadRef.current.click()
        }
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

    const saveStickerContent = (id: string) => {
        if (id) {
            dispatch(createStickerContent({content: state.content, id}))

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

    useEffect(() => {
        if (state.content) {
            if (state.content.length >= 1200) {
                message.open({
                    type: 'warning',
                    content: 'Превышен лимит количества символов! Чрезмерное кол-во данных влияет на производительность '
                })
            }
        }


    }, [state.content?.length])

    useEffect(() => {
        setState({
            ...state,
            content: content
        })
    }, [content])

    return (
        <>
            <Flex wrap={'wrap'}>
                {bool ? <Input
                    className={'editable'}
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            saveNewTitle()
                        }
                    }
                    }
                    onBlur={saveNewTitle}
                    value={state.newTitle}
                    onChange={(e) => setState({...state, newTitle: e.currentTarget.value})}/> : <h3>{title}
                    <EditOutlined onClick={setTrue} style={{paddingLeft: 5, cursor: "pointer"}}/>
                </h3>}
            </Flex>

            <li>
                <Flex gap={25} wrap={'wrap'}>
                    <TextArea
                        showCount
                        allowClear
                        autoFocus
                        value={state.content}
                        maxLength={1200}
                        onChange={(e) => setState({...state, content: e.currentTarget.value})}
                        style={{height: 200, resize: 'vertical'}}
                    />


                    <Flex gap={20} wrap={'wrap'}>
                        <Button onClick={onDeleteSticker(id)} danger>Удалить стикер</Button>
                        <Button type={'primary'} onClick={() => saveStickerContent(id)}>Сохранить</Button>
                        <Button title={'формат - .doc, .docx, .txt - макс размер 1мб'}
                                onClick={uploadSticker}>{loading ? 'Загрузка файла...' : 'Загрузить файл'}</Button>
                        <Button onClick={() => handleDownloadSticker(title, content)}>Скачать файл</Button>
                        <input
                            ref={uploadRef}
                            onChange={handleUploadSticker}
                            accept={'.doc,.txt'}
                            type="file"
                            hidden
                        />
                    </Flex>
                </Flex>
            </li>

        </>
    )
})