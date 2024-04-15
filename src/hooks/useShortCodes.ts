import { useEffect, useState } from "react"
import { useAppSelector } from "../store/store"
import { message } from "antd"
import { ShortCodesType } from "../store/todo-shortcodes"

type ShortCodeType = {
    shortCode: ShortCodesType | null,
    meaning: string
}

export const useShortCode = (callback: (meaning: string) => void) => {

    const {shortcodes} = useAppSelector(state => state.todoShortcodes)
    const [shortState, setShortState] = useState<ShortCodeType>({
        shortCode: null,
        meaning: ''
    })


    const validateShortCode = (shortcode: string) => {
        setShortState({
            meaning: '',
            shortCode: null
        })

        const foundShortCode = shortcodes.find((shortCode) => shortCode.name === shortcode)
        if(foundShortCode){
            setShortState({
                ...shortState,
                meaning: foundShortCode.meaning,
                shortCode: foundShortCode
            })
        }
        else {
            message.open({
                type: 'error',
                content: 'Данный шорткод не существует!'
            }) 
        }
    }

    useEffect(() => {
        if(shortState.shortCode && shortState.meaning){
            callback(shortState.meaning)
        }
    }, [shortState.shortCode, shortState.meaning])

    const {meaning} = shortState
    return {
        meaning,
        validateShortCode
    }
    
}