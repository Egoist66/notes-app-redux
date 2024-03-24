import Swal from "sweetalert2";
import {RefObject} from "react";
import {Dispatch} from "@reduxjs/toolkit";
import {createStickerContent} from "../store/todo-stickers-slice";

export function getRussianDate(): string {
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const daysOfWeek = [
        'воскресенье', 'понедельник', 'вторник', 'среда',
        'четверг', 'пятница', 'суббота'
    ];

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();

    const russianDate = `${day} ${months[month]} ${year}, ${daysOfWeek[dayOfWeek]}`;
    return russianDate;
}


export function formatDate(timestamp: number) {
    const date = new Date(timestamp);


    const formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
    });

    return formattedDate;
}

export function replaceTagsOfType(inputString: string, tagType: string, replacementText: string) {
    const regex = new RegExp(`<${tagType}[^>]*>.*?<\\/${tagType}>`, 'gi');
    return inputString.replace(regex, replacementText);
}


export function removeTagsExceptLinks(inputString: string) {
    return inputString.replace(/<(?!\/?a(?=>|\s.*>))\/?.*?>/g, '');
}

export function replaceTags(inputString: string, replacementText: string) {
    return inputString.replace(/<[^>]+>/g, replacementText);
}

export function validateImageUrl(input: string): boolean {
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    return urlRegex.test(input);
}


export const MatchLinkinText = (regex: RegExp, text: string) => {
    const matchedValue = text.match(regex);

    return {
        matchedValue,
    };
};

type ModalConfig = {
    title: string
    icons: 'info' | 'success' | 'warning' | 'error' | 'question'
    type: any
    onSuccess: (value: string) => void
    onReject: () => void
}

// @ts-ignore
const initModal = ({type, onSuccess, onReject, icons, title}: ModalConfig) => {
    // @ts-ignore

    Swal.fire({
        title: title,
        icon: icons,
        input: type,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonColor: '#1677FF',
        confirmButtonColor: '#1677FF',
        cancelButtonText: 'Отмена',
        confirmButtonText: 'Установить',


    }).then(result => {
        if (result.isConfirmed) {
            onSuccess(result.value)
        } else {
            onReject()
        }

    })
}

export const RemoveLinkfromText = (regex: RegExp, text: string) => {
    const Linkregex = /<a[^>]*>([^<]+)<\/a>/g;
    const replacedText = text.replace(regex, "$1");
    return {
        Linkregex,
        replacedText,
    };
};


export function isElementFullscreen(element: HTMLElement | Element | null) {

    return (
        // @ts-ignore
        document.fullscreenElement === element || document?.webkitFullscreenElement === element
    );
}

export function requestFullFramescreen(element: HTMLElement | Element | null) {
    if (element?.requestFullscreen) {
        element?.requestFullscreen();
    } else { // @ts-ignore
        if (element?.webkitRequestFullscreen) {
            // @ts-ignore
            element?.webkitRequestFullscreen();
            // @ts-ignore
        } else if (element?.mozRequestFullScreen) {
            // @ts-ignore
            element?.mozRequestFullScreen();
            // @ts-ignore
        } else if (element?.msRequestFullscreen) {
            // @ts-ignore
            element?.msRequestFullscreen();
        }
    }
}

export const cancelTour = () => {

    // @ts-ignore
    Swal.fire({
        title: 'Прервать экспресс гайд по приложению?',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonColor: '#1677FF',
        confirmButtonColor: '#1677FF',
        cancelButtonText: 'Отмена',
        confirmButtonText: 'Да',


    }).then(result => {
        if (result.isConfirmed) {
            return true
        }

    })
        .catch((e) => {
            console.log(e)
            return false
        })

    return true

}

export const delay = (ms: number) => {
    return new Promise((res) => {
        const timer = setTimeout(() => {
            res({exec: 1})
            clearTimeout(timer)
        }, ms)
    })
}

export const makeSelection = (tag: 'a' | 'b' | 's' | 'mark' | 'i', ref: RefObject<HTMLDivElement>, dispatch: Dispatch, id: string) => {
    const selection = window.getSelection();
    if (selection ? selection.rangeCount > 0 : 0) {
        const range = selection?.getRangeAt(0);

        const selectedText = range?.toString();
        if (selectedText !== '') {
            if (tag === 'a') {

                const response = prompt('Введите URL')
                if (response !== null) {
                    const newNode = document.createElement(tag) as HTMLAnchorElement
                    if (newNode) {
                        newNode.href = response ? response : ''
                        newNode.target = '_blank'
                        range?.surroundContents(newNode);
                        selection?.removeAllRanges();
                        selection?.addRange(range!);
                        dispatch(createStickerContent({content: ref.current ? ref.current.innerHTML : '', id}))
                        return
                    }

                }


            } else {
                const newNode = document.createElement(tag) as HTMLElement
                if (newNode) {
                    range?.surroundContents(newNode);
                    selection?.removeAllRanges();
                    selection?.addRange(range!);

                    dispatch(createStickerContent({content: ref.current ? ref.current.innerHTML : '', id}))
                }

            }


        }

    }


}