import {Store} from "@reduxjs/toolkit";

export type StorePreloadedType<T = any> = () => T

export const PreloadedStore = () => {

    const persist = (key: string, store: Store) => {
           localStorage.setItem(key, JSON.stringify(store.getState()))

    }


    const preloadStore = (key: string): StorePreloadedType => {
        return () => {
            const persistedString = localStorage.getItem(key)
            if(persistedString){
                const parsedStore = JSON.parse(persistedString)

                return parsedStore
            }
            else {
                return  undefined
            }
        }
    }

    return {
        persist,
        preloadStore
    }
}