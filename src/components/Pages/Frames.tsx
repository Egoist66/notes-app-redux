import styled from "styled-components";
import {FC, memo, useEffect} from "react";
import {FrameForm} from "../FrameForm";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {FramesView} from "../FramesView";
import {getFramesFromLS} from "../../redux/todo-frames-slice";


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
    console.log('Frames')

    const {frames} = useAppSelector(state => state.todoFrames)
    const dispatch = useAppDispatch()

    const frameElements = frames.map(frame => (
        <FramesView id={frame.id} key={frame.id} url={frame.url} />
    ))


    useEffect(() => {
        dispatch(getFramesFromLS())
    }, [])

    return (
        <>
            <FrameForm />

            <StyledFrames id={'frames'}>

                {frameElements}


            </StyledFrames>

            {frames.length <=0 ? <h2>Фреймы отсутствуют</h2>: null}

        </>
    )
}

export default memo(Frames)