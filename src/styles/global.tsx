import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body, html {
    box-sizing: border-box;
    transition: 0.3s all ease;
    min-height: 100%;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  }


  aside ul {
    font-size: 17px !important;
  }

  #root, .app {
    min-height: 100%;
  }

  main {
    min-height: 100%;
    margin: 20px 20px !important;
    font-size: 18px !important;

  }

  main input {
    font-size: 18px !important;
  }

  body {
    overflow-x: hidden;
  }

  .darkTheme {
    color: white !important;
    transition: 0.3s all ease;
    background-color: rgb(0 0 22 / 90%) !important;
  }

  html.darkTheme label {
    color: white !important;
  }


  //.active.nav-link {
  //  background-color: rgba(0, 0, 0, 0.1);
  //}


  .done-task {
    color: #9e9e9e70
  }


  #storage {
    max-width: 1290px;
    padding: 15px;
    text-align: right;
  }

  h6, .storage {
    color: #1B7892;
  }

  html.darkTheme .storage {
    color: white !important;
  }

  html.darkTheme h6 {
    color: white !important;
  }

  #restore, #voice {
    display: inline-block;
  }

  :where(.css-dev-only-do-not-override-2i2tap).ant-layout {
    background-color: white !important;
  }

  .ant-menu {
    position: sticky !important;
    top: 0 !important;
  }

  .ant-layout-sider-children {
    position: relative !important;
  }
  
  #calendar {
    cursor: pointer;
  }

  :where(.css-dev-only-do-not-override-2i2tap).ant-layout.ant-layout-has-sider {
    min-height: 100vh !important;
  }
  
  .swal2-input:focus {
    border: 1px solid #1677FF !important;
    box-shadow: none !important;
  }

  ul {
    padding: 0;
    list-style: none;
  }
  #task-list li {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  
  .storage {
    color: #001529;
  }

  div:where(.swal2-container) {
    z-index: 999999999999999999999999999999999;
  }

  .delete {
    cursor: pointer;
  }
`

