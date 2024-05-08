import styled from "styled-components";
import  {FC, memo, useEffect, useState} from "react";
import {removeFrame} from "../../store/todo-frames-slice";
import {requestFullFramescreen} from "../../utils/utils";
import {Button, message} from "antd";
import {useDomSelector} from "../../hooks/hooks";
import {useAppDispatch} from "../../store/store";
import ReactPlayer from "react-player/lazy";

const StyledFramesView = styled.div`
  box-shadow: 1px 1px 7px 1px #a89f9f;
  height: 270px;
  border-radius: 10px;
  margin-bottom: 50px;
`;


type FramesViewProps = {
    url: string;
    id: string;
};

export const FramesView: FC<FramesViewProps> = memo(({url, id}) => {
    const [isFullScreened, setFullScreen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const {selector} = useDomSelector(`#frame-${id}`);

    const OnRemoveFrame = () => {
        dispatch(
            removeFrame({
                id,
            })
        );

        message.open({
            type: "warning",
            content: "Фрейм удален!",
        });
    };
    const requestFrameFullScreen = () => {
        requestFullFramescreen(selector);
    };
    const watchFullScreen = () => {
        if (document.fullscreenElement === selector) {
            console.log("full");
            setFullScreen(true);
        } else {
            console.log("not full");
            setFullScreen(false);
        }
    };

    useEffect(() => {
        selector?.addEventListener("fullscreenchange", watchFullScreen);

        return () => {
            selector?.removeEventListener("fullscreenchange", watchFullScreen);
        };
    }, [selector]);

    return (
        <>
            <StyledFramesView
                data-fullscreen={isFullScreened}
                id={`frame-${id}`}
                className={"frames-view"}
            >
                {/*<iframe*/}
                {/*  data-fullscreen={isFullScreened}*/}
                {/*  id={`frame-${id}`}*/}
                {/*  allowFullScreen*/}
                {/*  src={url}*/}
                {/*/>*/}

                <ReactPlayer
                    wrapper={(props) => <div   {...props} style={{borderRadius: 20, height: "100%"}}/>}
                    style={{borderRadius: 20}}
                    light
                    url={url}
                    controls
                />


                <div
                    className={"frame-controls"}
                    style={{marginTop: 20, display: "flex", gap: 10}}
                >
                    <Button style={{width: "100%"}} danger onClick={OnRemoveFrame}>
                        Удалить фрейм
                    </Button>
                    <Button style={{width: "100%"}} onClick={requestFrameFullScreen}>
                        Во весь экран
                    </Button>
                </div>
            </StyledFramesView>
        </>
    );
});
