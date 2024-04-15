import React from "react";
import {Button, Col, Flex, Input, Select, Switch, Tooltip, Typography} from "antd";
import {useTodoForm} from "../../hooks/useTodoForm";
import {useStickerUpload} from "../../hooks/useStickerUpload.ts";
import {useTransformJsonToHtml} from "../../hooks/useTransformJsonToHtml.ts";
import { useShortCode } from "../../hooks/useShortCodes.ts";
import { checkShortCodePattern } from "../../utils/utils.ts";

export type TodoFormStateType = {
  text: string;
  warning: string;
  maxTaskCount: number;
  isRestrictedTasks: boolean;
  speechTranscript: string;
  isInputBlocked: boolean;
};
export const TodoForm: React.FC = () => {
  const { Text } = Typography;

  const {
    addTaskInTodo,
    setRestrictedTasks,
    importUnCommitedText,
    injectUnCommitedText,
    handleInput,
    state,
    contextHolder,
    defaultValue,
    contextCountHolder,
    defferedValue,
    isInputDataInStorage,
    listening,
    initSpeechListening,
    browserSupportsSpeechRecognition,
    handleModeChange,
    setState,
    sortMode,
    sortParams,
  } = useTodoForm();

  const {validateShortCode} = useShortCode((meaning) => {
    setState({
      ...state,
      text: meaning
    })
  })
  const {handleDownloadSticker: handleDownloadNote} = useStickerUpload('')
  const {handleTransformJsonToHtml} = useTransformJsonToHtml()

  return (
    <>
      {contextHolder}

      <form onSubmit={addTaskInTodo}>
        {contextCountHolder}

        <Flex style={{ paddingBottom: 30 }} className="input-field">
          <Input
            allowClear
            status={state.warning ? "error" : ""}
            onBlur={() => {
              injectUnCommitedText();

              if(checkShortCodePattern(defferedValue)){
                validateShortCode(defferedValue)
                

               
              }
            }}
            disabled={state.isInputBlocked}
            placeholder={"Введите название"}
            value={state.text}
            onChange={(e) => {
              
              if(listening){
                return () => {}
              }
              handleInput(e);
            }}
            type="text"
          />
        </Flex>
      </form>

      <Flex wrap={"wrap"} gap={20} justify="space-between">
        <Col style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <Button
            id={"restore"}
            type="primary"
            size={"large"}
            onClick={importUnCommitedText}
            disabled={!isInputDataInStorage}
          >
            Восстановить
          </Button>

          {browserSupportsSpeechRecognition ? (
            <Button
              id={"voice"}
              size={"large"}
              disabled={listening}
              onClick={initSpeechListening}
            >
              {listening ? "Идет запись..." : "Голосовой ввод"}
            </Button>
          ) : (
            <p>Браузер не поддерживает голосовой ввод!</p>
          )}

          <Button
            id={"print"}
            type="primary"
            size={"large"}
            onClick={() => window.print()}
          >
            Распечатать
          </Button>
          <Button

            id={"download-note"}
            type="dashed"
            size={"large"}
            onClick={() => handleDownloadNote('notes', handleTransformJsonToHtml(), 'text/html')}
          >
            Скачать заметки
          </Button>
        </Col>

        <Col>
          <Select
            id="sort"
            data-value={sortMode}
            value={sortMode}
            onBlur={() => handleModeChange("Сортировать по")}
            onChange={handleModeChange}
            size="large"
            options={sortParams.map((data) => ({ label: data, value: data }))}
          />
        </Col>
      </Flex>

      <div id={"task-watcher"} style={{ marginBottom: "1rem" }}>
        <Flex style={{ paddingTop: 30 }} gap={10}>
          <Tooltip title={`Кол-во по умолчанию ${defaultValue}`}>
            <Switch
              checked={state.isRestrictedTasks}
              onChange={setRestrictedTasks}
            />
          </Tooltip>
          <Text>Установить ограничение кол-ва заметок</Text>
        </Flex>
      </div>
    </>
  );
};
