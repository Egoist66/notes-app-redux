import {useAppSelector} from "../store/store.ts";
import {useRef} from "react";

export const useTransformJsonToHtml = () => {

    const {todos} = useAppSelector(state => state.todos)
    const htmlStringRef = useRef<string>('')


    const handleTransformJsonToHtml = (): string => {
        return htmlStringRef.current = `
        <style>
                /* Styles for the table */
            table {
                width: 100%;
                font-family: Arial,serif;
                border-collapse: collapse;
            }
            
            th {
                background-color: #f2f2f2;
                border: 1px solid #ddd;
                padding: 8px;
            }
            
            td {
                border: 1px solid #ddd;
                padding: 8px;
            }
            
            /* Styles for alternating row colors */
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
        </style>
        <table>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created at</th>
                
            </tr>
            ${todos.map((todo) => {
            return `
                    <tr>
                        <td>${todo.id}</td>
                        <td>${todo.title}</td>
                        <td>${todo.completed ? 'Completed' : 'Incomplete'}</td>
                        <td>${todo.time}</td>
                    </tr>
                `
        }).join("")}
        </table>
    `
    }

    return {
        handleTransformJsonToHtml
    }
}
