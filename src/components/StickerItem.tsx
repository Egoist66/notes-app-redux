import {FC, memo} from "react";
import {Button, Col, Flex, Input} from "antd";
import {EditOutlined, MenuOutlined} from "@ant-design/icons";
import {useStickerUpload} from "../hooks/useStickerUpload";
import {useStickers} from "../hooks/useStickers";


type StickerItemProps = {
    id: string
    title: string
    content: string
    date: string
    isOpened: boolean
}

export const StickerItem: FC<StickerItemProps> = memo(({id, isOpened, date, content, title}) => {
    const {handleUploadSticker, handleDownloadSticker, loading} = useStickerUpload(id)
    const {
        onDeleteSticker,
        onSwitchHtmlByClickMode,
        onSwitchHtmlByBlurMode,
        showRawHTML,
        newTitle,
        contentData,
        onInputContent,
        areaRef,
        uploadSticker,
        uploadRef,
        deleteStickerContent,
        saveStickerContent,
        maxContentDataValue,
        toggleStickerItem,
        setTrue,
        saveNewTitle,
        onNewTitle,
        bool,


    } = useStickers(id, content, title)


    return (
        <>
            <Col style={{
                background: 'white',
                padding: 10,
                boxShadow: '1px 1px 3px 1px silver',
                borderRadius: 5,
                height: isOpened ? 'auto' : '10%',
                flexBasis: 530
            }}>


                <Col style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20
                }}>

                    <MenuOutlined
                        className={isOpened ? 'active sticker-burger' : 'sticker-burger'}
                        onClick={toggleStickerItem(id)}
                        style={{cursor: 'pointer'}}
                    />

                    {bool ? <Input
                            className={'editable'}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    saveNewTitle()
                                }
                            }
                            }
                            onBlur={saveNewTitle}
                            value={newTitle}
                            onChange={onNewTitle}/>
                        : <h3>
                            <span style={{color: '#4096FF'}}>{title}</span>

                            <EditOutlined onClick={setTrue} style={{paddingLeft: 5, cursor: "pointer"}}/>
                            <span style={{
                                display: 'inline-block',
                                paddingLeft: 10,
                                textDecoration: 'underline'
                            }}>{date}</span>
                        </h3>}

                </Col>

                {isOpened ? <li>
                    <Flex gap={25} wrap={'wrap'}>


                        <div ref={areaRef} className="text-area" style={{
                            width: '100%',
                            padding: 5,
                            background: 'white',
                            outlineColor: "#4489ea",
                            lineHeight: 1.5,
                            minHeight: 180,
                            position: 'relative',
                            borderRadius: 5,
                            maxHeight: 500,
                            overflow: 'auto',
                            border: '1px solid #D9D9D9'
                        }}
                             contentEditable
                             dangerouslySetInnerHTML={{__html: content}}
                             onDoubleClick={onSwitchHtmlByClickMode}
                             onBlur={onSwitchHtmlByBlurMode}
                             onInput={onInputContent}


                        />


                        <Flex gap={20} wrap={'wrap'}>
                            <Button onClick={onDeleteSticker(id)} danger>Удалить стикер</Button>
                            <Button type={'primary'} onClick={() => saveStickerContent(id)}>Сохранить</Button>

                            <Button id="html-btn"
                                    title="При наличии html сущностей в стикере можно отредактировать исходный код и сохранить измненения"
                                    type={'dashed'}
                                    onClick={onSwitchHtmlByClickMode}>
                                {showRawHTML ? 'Спрятать' : 'Показать'} HTML
                            </Button>


                            <Button title={'формат - .txt - макс размер 1мб'}
                                    onClick={uploadSticker}>{loading ? 'Загрузка файла...' : 'Загрузить файл'}</Button>
                            <Button onClick={() => handleDownloadSticker(title, content)}>Скачать файл</Button>
                            <Button danger onClick={deleteStickerContent(id)}>Очистить</Button>


                            <input
                                ref={uploadRef}
                                onChange={handleUploadSticker}
                                accept={'text/plain,.txt'}
                                type="file" hidden
                            />
                        </Flex>
                    </Flex>
                </li> : null}


                <Col style={{textAlign: 'end'}}>
                    {contentData?.length} / {maxContentDataValue}
                </Col>
            </Col>


        </>
    )
})