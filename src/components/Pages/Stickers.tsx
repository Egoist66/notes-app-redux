import React, {ChangeEvent, FC, memo, useDeferredValue, useEffect, useState} from "react";
import {Button, Flex, Input, message, Modal} from "antd";
import {useToggle} from "@react-hooks-library/core";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {createSticker, loadStikersFromLS} from "../../redux/todo-stickers-slice";
import {StickerItem} from "../StickerItem";
import {formatDate} from "../../utils/utils";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type StickersStateType = {
    fieldStatus: 'error' | 'warning' | ''
    title: string

}

const Stickers: FC = memo(() => {
    const {toggle, setFalse, bool} = useToggle(false)
    const [state, setState] = useState<StickersStateType>({
        fieldStatus: '',
        title: ''
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
                title: state.title.trim(),
                date: formatDate(Date.now())
            }))

            setFalse()
            setState({
                fieldStatus: '',
                title: ''
            })

            message.open({
                type: 'success',
                content: 'Стикер успешно создан!'
            })
        }


    }


    useEffect(() => {
        dispatch(loadStikersFromLS())
    }, [])

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
                            if(e.key === 'Enter'){
                                createTodoSticker()
                            }
                        }}
                        onChange={onChangeTitle}
                        value={defferedValue}
                        placeholder={'Добавьте название категории стикера'}

                    />


                </Modal>


            </Flex>

            <div id="stickers">

                <ul ref={listRef}>
                    {stickers.length ? stickers.map(s => (

                        <StickerItem content={s.content} title={s.title} id={s.id} key={s.id}/>

                    )) : <h3>Нет активных стикеров</h3>}
                </ul>

            </div>


        </>
    )
})

export default Stickers