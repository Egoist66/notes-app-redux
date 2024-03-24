import { ChangeEvent, useState } from "react";
import { removeAppBackground, saveImgUrl } from "../store/todo-pallete-options-slice";
import {validateImageUrl} from "../utils/utils";
import {PalleteMenuState} from "../components/Features/PalleteMenu";
import {Alert} from "antd";
import { LS, useToggle } from "./hooks";
import { useAppDispatch, useAppSelector } from "../store/store";

export const usePallete = () => {

    
    const [state, setState] = useState<PalleteMenuState>({
        imageData: '',
        imageUrl: '',
        urlError: false,
        statusMessage: '',
        urlStatusMessage: ''
    })
    const {toggle, setToggle} = useToggle()
    const {get, exist} = LS()
    const dispatch = useAppDispatch()

    const {appBackgroundImage} = useAppSelector(state => state.todoPalleteOptions)


    const onChangeImgUrl = (e: ChangeEvent<HTMLInputElement>) => {

        setState({
            ...state,
            imageUrl: e.currentTarget.value
        })

    }

    const validateImageURL = () => {
        if (!validateImageUrl(state.imageUrl)) {
            setState({
                ...state,
                urlStatusMessage: <Alert banner type={'error'} closable  message={'Введена невалидная строка!'} />
            })
        } else {
            setState({
                ...state,
                urlStatusMessage: ''
            })

        }


    }

    const onBlurChangeImgUrl = () => {

        if (!validateImageUrl(state.imageUrl)) {
            setState({
                ...state,
                urlError: true
            })
            return;
        }

        if (!state.imageUrl.trim()) {
            setState({
                ...state,
                urlError: true,
                statusMessage: 'Пустое значение запрещено'
            })
            return
        }
        setState({
            ...state,
            urlError: false,
            statusMessage: ''
        })
        dispatch(saveImgUrl(state.imageUrl))

    }


    const removeAppBg = () => {
        console.log('remove')
        setState({
            ...state,
            imageUrl: ''
        })

        dispatch(removeAppBackground())
    }







    return {
        toggle,
        setToggle,
        removeAppBg,
        onBlurChangeImgUrl,
        onChangeImgUrl,
        validateImageURL,
        state,
        exist,
        get,
        appBackgroundImage
    }
}