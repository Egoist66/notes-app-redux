import {JSX, ReactElement, ReactNode} from "react";

export type ChildrenProps = {
    children: ReactNode | ReactElement | JSX.Element;
}


export interface InitialPalleteStateType  {
    appBackgroundImage: string
}


export type TodosOptions = {
    id: number,
    title: string,
    completed: boolean,
    time: string
    timeStamp: number,
    sortMode: 'По названию' | 'По дате' | null
}
export type TodosOptionsForSlice = {
    payload: {
        id: number,
        title: string,
        completed: boolean,
        time: string,
        sortMode: 'По названию' | 'По дате' | null
        timeStamp: number
    }
}

export type TodosSortAction = {
    payload: {
        mode: 'По названию' | 'По дате'
    }
}


export type SpeechRecognitionStateType = {
    transcript: string
    recognitionMode: boolean
}


