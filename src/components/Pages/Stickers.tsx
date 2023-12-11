import {ChangeEvent, FC, memo, useDeferredValue, useEffect, useState} from "react";
import {Button, Col, Flex, Input, message, Modal, Popover, Select, Switch, Typography} from "antd";
import {useToggle} from "@react-hooks-library/core";
import {LS, useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {createSticker, deleteAllStickers, loadStikersFromLS, sortStickers} from "../../redux/todo-stickers-slice";
import {StickerItem} from "../StickerItem";
import {formatDate} from "../../utils/utils";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useSort} from "../../hooks/useSort";

type StickersStateType = {
    fieldStatus: 'error' | 'warning' | ''
    title: string
    isOpened: boolean

}

const Stickers: FC = memo(() => {
    const {Text} = Typography

    const {handleModeChange, sortMode, sortParams} = useSort()
    const {toggle, setFalse, bool} = useToggle(false)
    const {get, exist} = LS()
    const [state, setState] = useState<StickersStateType>({
        fieldStatus: '',
        title: '',
        isOpened: false
    })


    const [open, setOpen] = useState(false);

    const hidePopover = () => {
        setOpen(false);
    };

    const handleOpenPopover = (newOpen: boolean) => {
        setOpen(newOpen);
    };

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
                timestamp: Date.now(),
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

    const removeAllStickers = () => {
        dispatch(deleteAllStickers())
        message.open({
            type: 'warning',
            content: 'Стикеры удалены!'
        })

    }

    const setStickerOpened = () => {
        setState({
            ...state,
            isOpened: !state.isOpened
        })
    }

    useEffect(() => {
        dispatch(loadStikersFromLS())
    }, [exist('stickers') ? get('stickers').length : []])


    useEffect(() => {
        if (sortMode === 'По дате') {
            console.log(2);

            dispatch(sortStickers({mode: 'По дате'}))
        } else if (sortMode === 'По названию') {
            dispatch(sortStickers({mode: 'По названию'}))

        }
    }, [sortMode])


    return (
        <>

            <Flex justify="space-between" gap={20} wrap={'wrap'}>


                <Col style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 20
                }}>
                    <Button onClick={toggle}>Создать стикер</Button>
                    <Popover
                        content={(

                            <Col style={{
                                display: 'flex',
                                gap: 10,
                                flexWrap: 'wrap'
                            }}>
                                <Button danger onClick={() => {
                                    removeAllStickers()
                                    hidePopover()

                                }}>Да</Button>
                                <Button type="primary" id="no-btn" onClick={hidePopover}>Нет</Button>

                            </Col>


                        )}
                        title="Уверены очистить все?"
                        placement="rightBottom"
                        trigger="click"

                        open={open}
                        onOpenChange={handleOpenPopover}
                    >
                        <Button disabled={stickers.length <= 0} danger>Удалить все стикеры</Button>
                    </Popover>

                </Col>

                <Col>
                    <Select
                        data-value={sortMode}
                        value={sortMode}
                        onBlur={() => handleModeChange('Сортировать по')}
                        onChange={handleModeChange}
                        style={{width: 240}}
                        options={sortParams.map((data) => ({label: data, value: data}))}
                    />


                </Col>


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

                        <Text id={'sticker-state'} style={{paddingLeft: 10, display: 'inline-block'}}>Сделать стикер
                            активным по умолчанию?</Text>


                    </div>

                    <div style={{paddingTop: 30}}>
                        <Text>
                            Подсказка:

                            <Text underline type={'secondary'} style={{paddingLeft: 5}}>
                                Для того чтобы текст сделать жирным, курсивным или выделить маркером,
                                используйте следующие клавиши <code><b>Ctrl + b</b></code><br/><code><b>Ctrl +
                                i</b></code>
                                <code><b>Ctrl + m</b></code> (каждая функция по порядку)
                            </Text>
                        </Text>
                    </div>


                </Modal>


            </Flex>

            <div id="stickers">

                <ul ref={listRef}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 20,

                    }}

                >
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