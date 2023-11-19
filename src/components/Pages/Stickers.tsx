import React, {ChangeEvent, FC, memo, useCallback, useDeferredValue, useEffect, useState} from "react";
import {Button, Checkbox, Flex, Input, message, Modal, Switch, Typography} from "antd";
import {useToggle} from "@react-hooks-library/core";
import {LS, useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {createSticker, loadStikersFromLS, toggleSticker} from "../../redux/todo-stickers-slice";
import {StickerItem} from "../StickerItem";
import {formatDate} from "../../utils/utils";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type StickersStateType = {
    fieldStatus: 'error' | 'warning' | ''
    title: string
    isOpened: boolean

}

const Stickers: FC = memo(() => {
    const {Text} = Typography

    const {toggle, setFalse, bool} = useToggle(false)
    const {get, exist} = LS()
    const [state, setState] = useState<StickersStateType>({
        fieldStatus: '',
        title: '',
        isOpened: false
    })

    const defferedValue = useDeferredValue(state.title)
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const dispatch = useAppDispatch()
    const {stickers} = useAppSelector(state => state.todoStickers)


    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            fieldStatus: '',
            title: e.currentTarget.value
        })
    }

    const createTodoSticker = () => {

        if (!state.title.length) {
            setState({
                ...state,
                fieldStatus: 'error'
            })
            message.open({
                type: 'error',
                content: 'Пустое значение!'
            })
            return
        } else {
            dispatch(createSticker({
                isOpened: state.isOpened,
                title: state.title.trim(),
                date: formatDate(Date.now())
            }))

            setFalse()
            setState({
                ...state,
                fieldStatus: '',
                title: ''
            })

            message.open({
                type: 'success',
                content: 'Стикер успешно создан!'
            })
        }


    }

    const setStickerOpened =() => {
        setState({
            ...state,
            isOpened: !state.isOpened
        })
    }

    useEffect(() => {
        dispatch(loadStikersFromLS())
    }, [exist('stickers') ? get('stickers').length : []])



    return (
        <>

            <Flex wrap={'wrap'}>

                <Button onClick={toggle}>Создать стикер</Button>


                <Modal
                    centered
                    onOk={createTodoSticker}
                    onCancel={setFalse}
                    title={'Создание стикера'}
                    cancelText={'Отмена'}
                    okText={'Создать'}
                    open={bool}>


                    <Input
                        status={state.fieldStatus}
                        autoFocus={true}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createTodoSticker()
                            }
                        }}
                        onChange={onChangeTitle}
                        value={defferedValue}
                        placeholder={'Добавьте название категории стикера'}

                    />

                    <div style={{paddingTop: 30}}>
                        <Switch
                            data-isopened={state.isOpened}
                            onChange={setStickerOpened}
                            checked={state.isOpened}


                        />

                        <Text id={'sticker-state'} style={{paddingLeft: 10, display: 'inline-block'}}>Сделать стикер активным по умолчанию?</Text>


                    </div>


                </Modal>


            </Flex>

            <div id="stickers">

                <ul ref={listRef}>
                    {stickers.length ? stickers.map((s, i: number) => (

                        <StickerItem
                            isOpened={s.isOpened}
                            date={s.date}
                            content={s.content}
                            title={s.title}
                            id={s.id}
                            key={s.id}
                        />

                    )) : <h3>Нет активных стикеров</h3>}
                </ul>

            </div>


        </>
    )
})

export default Stickers