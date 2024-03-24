import { FC, memo } from "react";
import { Button, Flex, Modal } from "antd";
import { useStickerUpload } from "../../hooks/useStickerUpload";
import { delay, replaceTags } from "../../utils/utils";
import { useSticker } from "../../hooks/useSticker";
import { useClickOutside, useToggle } from "@react-hooks-library/core";

type StickerContentAreaProps = {
  id: string;
  content: string | null;
  title: string;
  isOpened: boolean;
};
export const StickerContentArea: FC<StickerContentAreaProps> = memo(
  ({ id, content, title, isOpened }) => {
    const {
      areaRef,
      onSwitchHtmlByBlurMode,
      onSwitchHtmlByClickMode,
      onInputContent,
      onDeleteSticker,
      saveStickerContent,
      deleteStickerContent,
      makeTextDecoration,
      uploadRef,
      showRawHTML,
      clickRef,
      uploadSticker,
    } = useSticker(id, content, title);
    const { handleUploadSticker, handleDownloadSticker, loading } =
      useStickerUpload(id);
    const { setFalse, setTrue, bool } = useToggle(false);

    useClickOutside(clickRef, () => setFalse(), {
      event: "pointerdown",
    });

    return (
      <>
        {isOpened ? (
          <li>
            <Flex gap={25} wrap={"wrap"}>
              <div
                ref={areaRef}
                className="text-area"
                style={{
                  width: "100%",
                  padding: 5,
                  background: "white",
                  outlineColor: "#4489ea",
                  lineHeight: 1.5,
                  minHeight: 180,
                  position: "relative",
                  borderRadius: 5,
                  maxHeight: 500,
                  overflow: "auto",
                  border: "1px solid #D9D9D9",
                }}
                contentEditable
                dangerouslySetInnerHTML={{ __html: content! }}
                onDoubleClick={onSwitchHtmlByClickMode}
                onContextMenu={() => alert}
                onKeyDown={makeTextDecoration}
                onBlur={() => delay(500).then(onSwitchHtmlByBlurMode)}
                onInput={onInputContent}
              />

              <Flex gap={20} wrap={"wrap"}>
                <Button
                  className="controls-btn"
                  onClick={onDeleteSticker(id)}
                  danger
                >
                  Удалить стикер
                </Button>
                <Button type={"primary"} onClick={() => saveStickerContent(id)}>
                  Сохранить
                </Button>

                <Button
                  id="html-btn"
                  title="При наличии html сущностей в стикере можно отредактировать исходный код и сохранить измненения"
                  type={"dashed"}
                  onClick={onSwitchHtmlByClickMode}
                >
                  {showRawHTML ? "Спрятать" : "Показать"} HTML
                </Button>

                <Button
                  className="controls-btn"
                  title={"формат - .txt - макс размер 1мб"}
                  onClick={uploadSticker}
                >
                  {loading ? "Загрузка файла..." : "Загрузить файл"}
                </Button>

                <Modal
                  className={"sticker-modal-file"}
                  open={bool}
                  closeIcon={true}
                  title={`Имя стикера: ${title}`}
                  cancelText={"Отмена"}
                  onCancel={setFalse}
                >
                  <h3>Выберите формат файла</h3>
                  <Flex gap={20} wrap={"wrap"} style={{ marginTop: 20 }}>
                    <Button
                      size="large"
                      type="dashed"
                      onClick={() =>
                        handleDownloadSticker(
                          title,
                          replaceTags(content!, ""),
                          "plain/text"
                        )
                      }
                    >
                      TXT
                    </Button>

                    <Button
                      size="large"
                      type="dashed"
                      onClick={() =>
                        handleDownloadSticker(title, content, "text/html")
                      }
                    >
                      HTML
                    </Button>
                  </Flex>
                </Modal>
                <Button disabled={!content} type="primary" onClick={setTrue}>
                  Скачать файл
                </Button>
                <Button
                  className="controls-btn"
                  danger
                  onClick={deleteStickerContent(id)}
                >
                  Очистить
                </Button>

                <input
                  ref={uploadRef}
                  onChange={handleUploadSticker}
                  accept={"text/plain,.txt"}
                  type="file"
                  hidden
                />
              </Flex>
            </Flex>
          </li>
        ) : null}
      </>
    );
  }
);
