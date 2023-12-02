import { FC, memo, useEffect } from "react";
import { Portal } from "./Portal";
import { CronPopup } from "./CronPopup";
import { ContextMenu } from "./ContextMenu";
import { Checkbox } from "antd";
import { useTaskItems } from "../hooks/useTaskItems";

type TaskItemProps = {
    data: {
        id: number;
        title: string;
        completed: boolean;
        time: string;
        timeStamp: number;
    };
};

export type TaskItemState = {
    editMode: boolean
    isPopupEnabled: boolean
    isContextMenuEnabled: boolean
}

export const TaskItem: FC<TaskItemProps> = memo(({ data }) => {

    const {
        isPopupEnabled,
        isContextMenuEnabled,
        editMode,
        state,
        toggleTask,
        setState,
        enableEditMode,
        initEditMode,
        deleteTask,
        toggleContextMenu,
        togglePopup
    } = useTaskItems()

    const { completed, id, time, title } = data;



    useEffect(() => {
        initEditMode(title, id);

        return () => {
        };
    }, [editMode]);

    return (
        <>
            <li>


                <Checkbox checked={completed} onChange={() => toggleTask(id)} />


                {!completed ? (
                    <span
                        onContextMenu={toggleContextMenu}
                        className={completed ? "done-task" : ""}
                        dangerouslySetInnerHTML={{ __html: title }}
                    ></span>
                ) : (
                    <span className={completed ? "done-task" : ""}>
                        <s dangerouslySetInnerHTML={{ __html: title }}></s>
                    </span>
                )}
                <span onClick={() => deleteTask(id)} className={"delete"}>
                    &times;
                </span>
                <span
                    id={"edit"}
                    style={{
                        color: editMode ? "red" : "",
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                    onClick={enableEditMode}
                >
                    &#9998;
                </span>
                <span onClick={togglePopup} id={"calendar"}>
                    &#128197;
                </span>
                <span style={{ textDecoration: 'underline' }}>{time}</span>
            </li>

            {isPopupEnabled ? (
                <Portal>
                    {isPopupEnabled && (
                        <CronPopup
                            id={id}
                            setState={setState}
                            state={state}
                        />
                    )}
                </Portal>
            ) : null}

            {isContextMenuEnabled ? (
                <Portal>{
                    isContextMenuEnabled &&
                    <ContextMenu
                        id={id}
                        title={title}
                        state={state}
                        setState={setState}

                    />}
                </Portal>
            ) : null}
        </>
    );
})
