import { FC, memo } from "react";
import { Button, Col, Flex, Input, Modal, Popover, Select, Switch, Typography } from "antd";
import {Helmet} from "react-helmet";
import { StickerItem } from "../Features/StickerItem";
import { useStickers } from "../../hooks/useStickers";


const Stickers: FC = memo(() => {
  const { Text } = Typography;

  const {
    toggle,
    hidePopover,
    open,
    handleOpenPopover,
    defferedValue,
    listRef,
    onChangeTitle,
    createTodoSticker,
    removeAllStickers,
    setStickerOpened,
    state,
    sortParams,
    sortMode,
    handleModeChange,
    stickers,
    setFalse,
    bool
  } = useStickers()

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Стикеры</title>
        <link rel="canonical" href="/" />
      </Helmet>

      <Flex justify="space-between" gap={20} wrap={"wrap"}>
        <Col
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <Button onClick={toggle}>Создать стикер</Button>
          <Popover
            content={
              <Col
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  danger
                  onClick={() => {
                    removeAllStickers();
                    hidePopover();
                  }}
                >
                  Да
                </Button>
                <Button type="primary" id="no-btn" onClick={hidePopover}>
                  Нет
                </Button>
              </Col>
            }
            title="Уверены очистить все?"
            placement="rightBottom"
            trigger="click"
            open={open}
            onOpenChange={handleOpenPopover}
          >
            <Button disabled={stickers.length <= 0} danger>
              Удалить все стикеры
            </Button>
          </Popover>
        </Col>

        <Col>
          <Select
            data-value={sortMode}
            value={sortMode}
            onBlur={() => handleModeChange("Сортировать по")}
            onChange={handleModeChange}
            style={{ width: 240 }}
            options={sortParams.map((data) => ({ label: data, value: data }))}
          />
        </Col>

        <Modal
          centered
          onOk={createTodoSticker}
          onCancel={setFalse}
          title={"Создание стикера"}
          cancelText={"Отмена"}
          okText={"Создать"}
          open={bool}
        >
          <Input
            status={state.fieldStatus}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTodoSticker();
              }
            }}
            onChange={onChangeTitle}
            value={defferedValue}
            placeholder={"Добавьте название категории стикера"}
          />

          <div style={{ paddingTop: 30 }}>
            <Switch
              data-isopened={state.isOpened}
              onChange={setStickerOpened}
              checked={state.isOpened}
            />

            <Text
              id={"sticker-state"}
              style={{ paddingLeft: 10, display: "inline-block" }}
            >
              Сделать стикер активным по умолчанию?
            </Text>
          </div>

          <div style={{ paddingTop: 30 }}>
            <Text className="hints">
              Подсказка:
              <Text
                className="hints"
                underline
                type={"secondary"}
                style={{ paddingLeft: 5 }}
              >
                Для того чтобы текст сделать жирным, курсивным или выделить
                маркером, используйте следующие клавиши{" "}
                <code>
                  <b>Ctrl + b</b>
                </code>
                <br />
                <code>
                  <b>Ctrl + i</b>
                </code>
                <code>
                  <b>Ctrl + m</b>
                </code>{" "}
                (каждая функция по порядку)
              </Text>
            </Text>
          </div>
        </Modal>
      </Flex>

      <div id="stickers">
        <ul
          ref={listRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {stickers.length ? (
            stickers.map((s) => (
              <StickerItem
                isOpened={s.isOpened}
                date={s.date}
                content={s.content}
                title={s.title}
                id={s.id}
                key={s.id}
              />
            ))
          ) : (
            <h3>Нет активных стикеров</h3>
          )}
        </ul>
      </div>
    </>
  );
});

export default Stickers;
