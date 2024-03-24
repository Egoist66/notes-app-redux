import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Storage } from "../Storage";
import { Layout, Menu, Skeleton } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { NavBar } from "./NavBar";
import { useToggle } from "@react-hooks-library/core";
import { Pallete } from "../Pallete";
import { setAppUrlImageFromLS } from "../../store/todo-pallete-options-slice";
import { RoutesData } from "../../routes/Routes";
import { useAppGuide, preventDocumentContextMenu } from "../../hooks/hooks";
import { useAppDispatch, useAppSelector } from "../../store/store";

const LazyTodolist = lazy(() => import("../Pages/TodoList"));
const LazyInformation = lazy(() => import("../Pages/Info"));
const LazyFrames = lazy(() => import("../Pages/Frames"));
const LazySettings = lazy(() => import("../Pages/Settings"));
const LazyStickers = lazy(() => import("../Pages/Stickers"));
const Lazy404 = lazy(() => import("../Pages/404"));

const contentStyles = (appBackgroundImage: string) => {
  return {
    margin: "24px 16px",
    padding: 24,
    minHeight: 300,
    backgroundColor: "#f8f8ffb3",
    borderRadius: 5,
    backgroundImage: `url(${appBackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
  };
};

export const AppLayout: React.FC = () => {
  const { initAppGuide } = useAppGuide();
  const dispatch = useAppDispatch();
  const { toggle, bool } = useToggle();
  const { appBackgroundImage } = useAppSelector(
    (state) => state.todoPalleteOptions
  );

  useEffect(() => {
    preventDocumentContextMenu();
    initAppGuide(true);

    return () => {};
  }, []);

  useEffect(() => {
    dispatch(setAppUrlImageFromLS());
  }, [appBackgroundImage]);

  return (
    <div className="app">
      <Layout>
        <Sider trigger={null} collapsible collapsed={bool}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={RoutesData}
          />
        </Sider>

        <Layout>
          <NavBar collapsed={bool} setCollapsed={toggle} />

          <Content
            className={"main-content"}
            style={contentStyles(appBackgroundImage)}
          >
            <Suspense fallback={<Skeleton avatar paragraph={{ rows: 4 }} />}>
              <Routes>
                <Route index path={"/"} element={<LazyTodolist />} />
                <Route path={"/frames"} element={<LazyFrames />} />
                <Route path={"/stickers"} element={<LazyStickers />} />
                <Route path={"/information"} element={<LazyInformation />} />
                <Route path={"/settings"} element={<LazySettings />} />
                <Route path={"*"} element={<Lazy404 />} />
              </Routes>
            </Suspense>

            <Storage />
          </Content>
        </Layout>
      </Layout>

      <Pallete />
    </div>
  );
};
