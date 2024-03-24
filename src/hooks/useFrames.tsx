import { useCallback, useMemo, useState } from "react";
import {FramesView} from "../components/Features/FramesView";
import { useAppSelector } from "../store/store";

export const useFrames = () => {
    const [isAllShown, setShowAll] = useState<boolean>(false)

    const {frames} = useAppSelector(state => state.todoFrames)

    const [currentPage, setCurrentPage] = useState<number>(0)
    const itemsPerPage = 3;
    const visibleItems = frames.slice(currentPage, currentPage + itemsPerPage);

    const frameElements = useMemo(() => {
        return visibleItems.map(frame => (
            <FramesView id={frame.id} key={frame.id} url={frame.url}/>
        ))
    }, [visibleItems])


    const allFrameElements = useMemo(() => {
        return frames.map(frame => (
            <FramesView id={frame.id} key={frame.id} url={frame.url}/>
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


    return {
        itemsPerPage,
        currentPage,
        showAllFrames,
        isAllShown,
        paginateFrames,
        paginateBackFrames,
        frames,
        frameElements,
        allFrameElements
    }
}