import styled from "styled-components";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { FrameForm } from "../FrameForm";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FramesView } from "../FramesView";
import { getFramesFromLS } from "../../redux/todo-frames-slice";
import { Col, Typography } from "antd";


const StyledFrames = styled.div`
  margin-top: 90px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  place-items: center;
  text-align: center;
  gap: 30px;
  justify-content: center;


`


const Frames: FC = () => {

    const [isAllShown, setShowAll] = useState<boolean>(false)

    const { frames } = useAppSelector(state => state.todoFrames)
    const dispatch = useAppDispatch()
    const { Text } = Typography

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const visibleItems = frames.slice(currentPage, currentPage + itemsPerPage);


    const frameElements = useMemo(() => {
        return visibleItems.map(frame => (
            <FramesView id={frame.id} key={frame.id} url={frame.url} />
        ))
    }, [visibleItems])


    const allFrameElements = useMemo(() => {
        return frames.map(frame => (
            <FramesView id={frame.id} key={frame.id} url={frame.url} />
        ))
    }, [frames])

    const paginateFrames = useCallback(() => {
        const newIndex = currentPage + itemsPerPage
        setCurrentPage(newIndex)
    }, [currentPage])

    const paginateBackFrames = useCallback(() => {
        const newIndex = currentPage - itemsPerPage
        setCurrentPage(newIndex)
    }, [currentPage])

    const showAllFrames = useCallback(() => {
        setShowAll(isAllShown => !isAllShown)
    }, [isAllShown])



    useEffect(() => {
        dispatch(getFramesFromLS())
    }, [])

    return (
        <>
            <Text style={{ paddingBottom: 50, display: 'block' }} underline type={'secondary'}>
                При использовании ресурсов из платформы YouTube необходимо в корректном формате
                импортировать фрейм.<br /> Для этого выберете подходящее видео далее нажмите на
                "Поделиться" ➡️ "Встроить" ➡️ "Скопировать HTML" и вставить в поле ввода приложения.<br />
                <Text type={'danger'}>Опция фреймов работает полностью только на ОС компьютеров и Планшетов.
                    На мобильных устройствах функция "Во весь экран" не работает"
                </Text>
            </Text>

            <FrameForm
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                showAllFrames={showAllFrames}
                isAllShown={isAllShown}
                paginateBackFrames={paginateBackFrames}
                paginateFrames={paginateFrames}
            />

            <StyledFrames id={'frames'}>

               {isAllShown ? allFrameElements : frameElements}


            </StyledFrames>

            {frames.length <= 0 ? <h3 id={'frame-message-no-data'}>Фреймы отсутствуют</h3> : null}


            <Col style={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 30
            }}>

                <Text>Количество фреймов - {frames.length}</Text>
                <Text>Шаг пагинации - {currentPage + 1}</Text>


            </Col>
        </>
    )
}

export default memo(Frames)