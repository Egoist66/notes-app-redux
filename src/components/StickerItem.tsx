import { FC, memo, useEffect, useRef, useState } from "react";
import { Button, Col, Flex, Input, message } from "antd";
import { useAppDispatch } from "../hooks/hooks";
import { createStickerContent, deleteSticker, editStickerTitle, toggleSticker } from "../redux/todo-stickers-slice";
import { EditOutlined, MenuOutlined } from "@ant-design/icons";
import { useToggle } from "@react-hooks-library/core";
import { useStickerUpload } from "../hooks/useStickerUpload";

type StickersStateType = {
    fieldStatus: 'error' | 'warning' | ''
    newTitle: string
    content: string | null
    maxContentValue: number
    emptyCount: number,
    showHTML: boolean


}

type StickerItemProps = {
    id: string
    title: string
    content: string
    date: string
    isOpened: boolean
}

export const StickerItem: FC<StickerItemProps> = memo(({
    id,
    isOpened,
    date,
    content,
    title
}) => {
    const { handleUploadSticker, handleDownloadSticker, loading } = useStickerUpload(id)
    const dispatch = useAppDispatch()

    const { setTrue, setFalse, bool } = useToggle(false)
    const uploadRef = useRef<HTMLInputElement>(null)
    const areaRef = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<StickersStateType>({
        fieldStatus: '',
        newTitle: title,
        content: '',
        emptyCount: 0,
        maxContentValue: 10000,
        showHTML: false
    })

    const uploadSticker = () => {
        if (uploadRef.current) {
            uploadRef.current.click()
        }
    }

    const onDeleteSticker = (stickerId: string) => {
        return () => {
            dispatch(deleteSticker({ id: stickerId }))
            message.open({
                type: 'warning',
                content: 'Стикер удален!'
            })
        }
    }

    const toggleStickerItem = (stickerId: string) => {
        return () => {
            dispatch(toggleSticker({ id: stickerId }))
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

        dispatch(editStickerTitle({ id, newtitle: state.newTitle }))
        message.open({
            type: 'success',
            content: 'Изменено!'
        })
        setFalse()
    }

    const showRawHTML = (mode: 'textContent' | 'innerHTML') => {
        if (areaRef.current) {
            areaRef.current[mode] = content
        }
    }

    const saveStickerContent = (id: string) => {
        if (id) {
            dispatch(createStickerContent({ content: state.content ? state.content : '', id }))

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
        if (state.showHTML) {
            console.log(state.showHTML);
            
            showRawHTML('textContent')
        }
        else {
            showRawHTML('innerHTML')
        }
    }, [state.showHTML])

    useEffect(() => {
        if (state.content) {
            if (state.content.length >= state.maxContentValue) {
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

    useEffect(() => {
        if (areaRef.current) {
            areaRef.current.innerHTML = content
        }
    }, [content])

    useEffect(() => {

        if(state.content === content){
            return
        }

        if (state.emptyCount === 1 && state.content === '') {
            saveStickerContent(id)



        }

        if (state.content !== '') {
            saveStickerContent(id)

        }


    }, [state.emptyCount])

    return (
        <>
            <Flex align={'center'} gap={15} wrap={'wrap'}>

                <MenuOutlined
                    className={isOpened ? 'active sticker-burger' : 'sticker-burger'}
                    onClick={toggleStickerItem(id)}
                    style={{ cursor: 'pointer' }}
                />

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
                    onChange={(e) => setState({ ...state, newTitle: e.currentTarget.value })} />
                    : <h3>
                        <span style={{ color: '#4096FF' }}>{title}</span>

                        <EditOutlined onClick={setTrue} style={{ paddingLeft: 5, cursor: "pointer" }} />
                        <span style={{
                            display: 'inline-block',
                            paddingLeft: 10,
                            textDecoration: 'underline'
                        }}>{date}</span>
                    </h3>}
                <span
                    id={'delete-icon'}
                    onClick={onDeleteSticker(id)}
                    style={{ fontSize: 22, color: '#FF7E7B', cursor: "pointer" }}
                >&times;
                </span>
            </Flex>

            {isOpened ? <li>
                <Flex gap={25} wrap={'wrap'}>


                    <div ref={areaRef} className="text-area" style={{
                        width: '100%',
                        padding: 5,
                        background: 'white',
                        outlineColor: "#4489ea",
                        minHeight: 180,
                        position: 'relative',
                        borderRadius: 5,
                        border: '1px solid #D9D9D9'
                    }}
                        contentEditable
                        onDoubleClick={() => {
                            setState((prevState) => ({
                                ...prevState,
                                showHTML: !prevState.showHTML
                            }))
                        }}
                        onBlur={() => {

                            setState((prevState) => ({
                                ...prevState,
                                emptyCount: prevState.emptyCount + 1
                            }))
                        }}
                        data-value={state.content}
                        onInput={(e) => setState({ ...state, content: e.currentTarget.textContent })}

                    />



                    <Flex gap={20} wrap={'wrap'}>
                        <Button onClick={onDeleteSticker(id)} danger>Удалить стикер</Button>
                        <Button  type={'primary'} onClick={() => saveStickerContent(id)}>Сохранить</Button>

                        <Button id="html-btn" title="При наличии html сущностей в стикере можно отредактировать исходный код и сохранить измненения" type={'dashed'} onClick={() => {
                            setState((prevState) => ({
                                ...prevState,
                                showHTML: !prevState.showHTML
                            }))
                        }}>Показать HTML</Button>


                        <Button title={'формат - .txt - макс размер 1мб'}
                            onClick={uploadSticker}>{loading ? 'Загрузка файла...' : 'Загрузить файл'}</Button>
                        <Button onClick={() => handleDownloadSticker(title, content)}>Скачать файл</Button>
                        <input
                            ref={uploadRef}
                            onChange={handleUploadSticker}
                            accept={'text/plain,.txt'}
                            type="file"
                            hidden
                        />
                    </Flex>
                </Flex>
            </li> : null}


            <Col style={{ textAlign: 'end' }}>
                {state.content?.length} / {state.maxContentValue}
            </Col>


        </>
    )
})