import { message } from "antd"
import { useAppDispatch, useAppSelector } from "../store/store"
import { addShortCode, ShortCodesType } from "../store/todo-shortcodes"

export const useShortCodeForm = () => {
    const dispatch = useAppDispatch()
    const {shortcodes} = useAppSelector(state => state.todoShortcodes)
    


    const generateShortCode = (name: string, meaning: string) => {
        const existingShortCode = shortcodes.find(shortcode => shortcode.name === name)
        if(existingShortCode && existingShortCode.name === name) {
            message.error({
                type: 'error',
                content: 'Шорткод с таким именем уже существует!',
            })
            return false
        }
        else {
            const shortCode = {
                id: crypto.randomUUID(),
                name,
                meaning,
                key: name,
            } as ShortCodesType
    
            dispatch(addShortCode(shortCode))
            message.success({
                type: 'success',
                content: 'Шорткод успешно создан!',
            })
            return true
        }
       
    }

    return {generateShortCode}
}