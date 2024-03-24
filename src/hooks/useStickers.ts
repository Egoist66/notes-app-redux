import { useAutoAnimate } from "@formkit/auto-animate/react";
import { message } from "antd";
import { useState, useDeferredValue, ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createSticker, deleteAllStickers, loadStikersFromLS, sortStickers } from "../store/todo-stickers-slice";
import { formatDate } from "../utils/utils";
import {LS } from "./hooks";
import { useSort } from "./useSort";
import { useToggle } from "@react-hooks-library/core";

type StickersStateType = {
    fieldStatus: "error" | "warning" | "";
    title: string;
    isOpened: boolean;
};
  

export const useStickers = () => {

  const dispatch = useAppDispatch();
  const { stickers } = useAppSelector((state) => state.todoStickers);
    
  const { handleModeChange, sortMode, sortParams } = useSort();
  const { toggle, setFalse, bool } = useToggle(false);
  const { get, exist } = LS();
  const [state, setState] = useState<StickersStateType>({
    fieldStatus: "",
    title: "",
    isOpened: false,
  });

  const [open, setOpen] = useState(false);

  const hidePopover = () => {
    setOpen(false);
  };

  const handleOpenPopover = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const defferedValue = useDeferredValue(state.title);
  const [listRef] = useAutoAnimate<HTMLUListElement>();



  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      fieldStatus: "",
      title: e.currentTarget.value,
    });
  };

  const createTodoSticker = () => {
    if (!state.title.length) {
      setState({
        ...state,
        fieldStatus: "error",
      });
      message.open({
        type: "error",
        content: "Пустое значение!",
      });
      return;
    } else {
      dispatch(
        createSticker({
          isOpened: state.isOpened,
          title: state.title.trim(),
          timestamp: Date.now(),
          date: formatDate(Date.now()),
        })
      );

      setFalse();
      setState({
        ...state,
        fieldStatus: "",
        title: "",
      });

      message.open({
        type: "success",
        content: "Стикер успешно создан!",
      });
    }
  };

  const removeAllStickers = () => {
    dispatch(deleteAllStickers());
    message.open({
      type: "warning",
      content: "Стикеры удалены!",
    });
  };

  const setStickerOpened = () => {
    setState({
      ...state,
      isOpened: !state.isOpened,
    });
  };

  useEffect(() => {
    dispatch(loadStikersFromLS());
  }, [exist("stickers") ? get("stickers").length : []]);

  useEffect(() => {
    if (sortMode === "По дате") {
      dispatch(sortStickers({ mode: "По дате" }));
    } else if (sortMode === "По названию") {
      dispatch(sortStickers({ mode: "По названию" }));
    }
  }, [sortMode]);


  return {
    state,
    listRef,
    onChangeTitle,
    createTodoSticker,
    removeAllStickers,
    setStickerOpened,
    open,
    hidePopover,
    handleOpenPopover,
    defferedValue,
    toggle,
    setFalse,
    bool,
    sortParams,
    sortMode,
    stickers,
    handleModeChange
  }

}