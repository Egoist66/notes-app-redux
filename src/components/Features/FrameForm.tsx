import { FC, memo } from "react";
import { useFramesFormValidation } from "../../hooks/useFrameFormValidation";
import { Button, Col, Flex, Input, Switch, Typography } from "antd";
import { useAppSelector } from "../../store/store";


export type FrameFormStateType = {
    url: string
    warning: string
    isExactMode: boolean
}

type FrameFormProps = {
    paginateFrames: () => void
    paginateBackFrames: () => void
    showAllFrames: () => void
    isAllShown: boolean
    itemsPerPage: number
    currentPage: number
}


export const FrameForm: FC<FrameFormProps> = memo(({ paginateFrames, isAllShown, paginateBackFrames, showAllFrames, itemsPerPage, currentPage }) => {

    const { Text } = Typography
    const { frames } = useAppSelector(state => state.todoFrames)


    const { addFrame, handleInput, state, setExactMode } = useFramesFormValidation()

    return (

        <>
            <form noValidate onSubmit={addFrame}>
                <div className='input-field'>
                    <Input
                        onChange={handleInput}
                        status={state.warning ? 'error' : ''}
                        value={state.url}
                        placeholder={'Добавьте URL адрес видео...'}
                        type="url" />

                </div>



                <Flex align="center" justify="space-between" style={{ paddingTop: 30 }} gap={10}>
                    <Col style={{
                        display: 'flex',
                        gap: 10
                    }}>

                        <Switch
                            title={'Точный анализ подразумевает особую обработку введеной ссылки под формат youtube без необходимости извлекать искомую ссылку из Iframe'}
                            checked={state.isExactMode}
                            onChange={setExactMode}

                        />
                        <Text>Точный анализ URL ссылки</Text>
                    </Col>

                    <Col style={{
                        display: 'flex',
                        gap: 10,
                        flexWrap: 'wrap'
                    }}>


                        <Button disabled={currentPage + itemsPerPage === 3 || isAllShown} onClick={paginateBackFrames} type="primary">Назад</Button>
                        <Button disabled={currentPage + itemsPerPage >= frames.length || isAllShown} onClick={paginateFrames} type="primary">Вперед</Button>
                        <Button className="show-off-frames" title="Данная опция может влиять на производительность" onClick={showAllFrames} type="dashed">
                            {isAllShown ? 'Cкрыть' : 'Показать все'}
                        </Button>


                    </Col>



                </Flex>


            </form>


        </>
    )
})