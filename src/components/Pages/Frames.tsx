import styled from "styled-components";
import {FC, memo, useEffect} from "react";
import {FrameForm} from "../FrameForm";
import {useAppDispatch} from "../../hooks/hooks";
import {getFramesFromLS} from "../../redux/todo-frames-slice";
import {Col, Typography} from "antd";
import {useFrames} from "../../hooks/useFrames";


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

    const {
        paginateFrames,
        paginateBackFrames,
        frames,
        allFrameElements,
        isAllShown,
        itemsPerPage,
        currentPage,
        showAllFrames,
        frameElements
    } = useFrames()

    const dispatch = useAppDispatch()
    const { Text } = Typography


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