import React, {FC} from "react";
import {Header} from "antd/es/layout/layout";
import {Button, Col, Row} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Search} from "../Search";


type NavBarProps = {
    changeTheme?: () => void
    theme?: string
    collapsed: boolean
    setCollapsed: () => void

}

export const NavBar: FC<NavBarProps> = ({changeTheme, collapsed, setCollapsed, theme}) => {

    return (

       <>

           <Header style={{padding: 0}}>
               <Button
                   type="text"
                   icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                   onClick={setCollapsed}
                   style={{
                       fontSize: '16px',
                       width: 64,
                       height: 64,
                       color: 'white'
                   }}
               />




           </Header>



       </>


    )
}