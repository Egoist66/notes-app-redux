import { useState } from "react"

export const useSort = () => {
     const sortParams = ['По названию', 'По дате']

     const [sortMode, setSortMode] = useState<string | null>('Сортировать по')

     const handleModeChange = (value: string) => {
          setSortMode(value)
     }


     return {
          sortParams,
          sortMode,
          handleModeChange
     }
}