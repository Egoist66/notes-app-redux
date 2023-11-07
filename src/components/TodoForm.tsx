import React, {memo} from "react";
import {Button, Flex, Input, Switch, Typography} from "antd";
import {useTodoForm} from "../hooks/useTodoForm";


export type TodoFormStateType = {
    text: string
    warning: string
    maxTaskCount: number
    isRestrictedTasks: boolean
    isInputBlocked: boolean
}
export const TodoForm: React.FC = memo(() => {

    const {Text} = Typography


    const {
        addTaskInTodo,
        setRestrictedTasks,
        initVoiceInput,
        importUnCommitedText,
        injectUnCommitedText,
        handleInput,
        state,
        contextHolder,
        recognitionMode,
        defaultValue,
        contextCountHolder,
        transcript,
        defferedValue,
        isInputDataInStorage
    } = useTodoForm()


    return (

        <>
            {contextHolder}

            <form onSubmit={addTaskInTodo}>
                {contextCountHolder}

                <Flex style={{paddingBottom: 30}} className='input-field'>
                    <Input
                        status={state.warning ? 'error' : ''}
                        onBlur={injectUnCommitedText}
                        disabled={state.isInputBlocked}
                        placeholder={'Введите название'}
                        value={recognitionMode ? transcript : defferedValue}
                        onChange={recognitionMode ? () => {
                        } : handleInput}
                        type="text"
                    />

                </Flex>


            </form>


            <Flex gap={30} wrap={"wrap"}>

                <Button
                    id={'restore'}
                    type="primary"
                    size={'large'}
                    onClick={importUnCommitedText}
                    disabled={!isInputDataInStorage}
                >Восстановить

                </Button>


                {"webkitSpeechRecognition" in window ? <Button
                    id={'voice'}
                    size={'large'}
                    title={'Ввод доступен только на английском языке'}
                    disabled={recognitionMode}
                    onClick={initVoiceInput}
                >{recognitionMode ? 'Идет запись...' : 'Голосовой ввод'}</Button> : null}


            </Flex>

            <div id={'task-watcher'} style={{marginBottom: '1rem'}}>


                <Flex style={{paddingTop: 30}} gap={10}>
                    <Switch
                        title={`Кол-во по умолчанию ${defaultValue}`}
                        checked={state.isRestrictedTasks}
                        onChange={setRestrictedTasks}

                    />
                    <Text>Установить ограничение кол-ва заметок</Text>
                </Flex>


            </div>

        </>
    )
})
