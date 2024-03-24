import {FC, memo} from "react";
import {Col, Input} from "antd";
import { EditOutlined, MenuOutlined } from "@ant-design/icons";
import {useStickers} from "../hooks/useStickers";
import {StickerContentArea} from "./StickerContent";


type StickerItemProps = {
    id: string
    title: string
    content: string | null
    date: string
    isOpened: boolean
}

export const StickerItem: FC<StickerItemProps> = memo(({id, isOpened, date, content, title}) => {
    const {
        newTitle, maxContentDataValue, toggleStickerItem,
        setTrue,
        saveNewTitle,
        onNewTitle,
        bool,

    } = useStickers(id, content, title)


    return (
        <>
            <Col className="stickers" style={{
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
                        style={{cursor: 'pointer', fontSize: 17}}
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
                            <span className="sticker-data" style={{
                                display: 'inline-block',
                                paddingLeft: 10,
                                textDecoration: 'underline'
                            }}>{date}</span>
                        </h3>}


                </Col>

                <StickerContentArea
                    id={id}
                    content={content}
                    title={title}
                    isOpened={isOpened}
                />


                <Col style={{textAlign: 'end'}}>
                    {content?.length} / {maxContentDataValue}
                </Col>
            </Col>


        </>
    )
})