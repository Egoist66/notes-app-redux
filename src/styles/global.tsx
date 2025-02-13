import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body, html {
    box-sizing: border-box;
    transition: 0.3s all ease;
    min-height: 100%;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  }
  
  .skiptranslate iframe {
    z-index: -11111 !important;
  }

  #task-list {
    height: 280px;
    overflow-y: auto;
  }

  :where(.css-dev-only-do-not-override-djtmh8).ant-modal .ant-modal-footer >.ant-btn+.ant-btn {
    display: none !important;
  }

  #swal2-textarea {
    resize: vertical;
    height: 220px;
    color: #001529;
  }

/*   
  #stickers > ul {
    max-height: 610px;
    overflow-x: auto;
  } */


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


  .text-area {
      font-size: 17px !important;
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
  header {
    position: relative;
  }
  .goog-te-gadget {
    color: transparent;
  }
  
  .editable {
    margin-bottom: 20px;
    margin-top: 20px;
    width: 50%;
    
  }

  
  
  textarea.ant-input {
    font-size: 17px !important;
    color:rgba(0, 0, 0, 0.88) !important;
  }
  
  ul {
    list-style: none;
  }

  .goog-te-combo {
    padding: 5px;
    border-radius: 5px;
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
  }
  .goog-te-combo option {
    color: black;
    cursor: pointer;
  }
  .goog-te-gadget a {
    display: none;
  }
  #google_translate_element {
    position: absolute;
    top: 19px;
    right: 5%;
    z-index: 2;
  }
  
  @media(max-width: 680px){
    #google_translate_element {
      position: static !important; 
    }

    .goog-te-combo {
     
      background: white;
      color: black;
    }
  }

 
  .ant-layout-sider + div {
    min-height: 100vh !important;
    background: white !important;
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
  
  li a {
    word-break: break-all !important;
  }

  .sticker-burger {
    transition: 0.3s all ease;
  }
  .sticker-burger:hover {
    color: #4096FF;
    transition: 0.3s all ease;
  }
  
  .active.sticker-burger {
    color: #4096FF;
  }
  #delete-icon {
    transition: 0.3s all ease;

  }
  #delete-icon:hover {
    transition: 0.3s all ease;
    color: red !important;
  }
  




  
 @media (max-width: 1220px) {
   #frames {
    display: block !important; 
   }
   
   .frames-view {
     margin-top: 70px !important;
   }
 }
  
  
  @media (max-width: 600px) {
    .frame-controls {
      flex-direction: column;
    }
    
    #delete-icon {
      display: none !important; 
    }
    
    
    .frames-view {
      margin-top: 110px !important;
    }
    
    #storage {
      padding-top: 40px;
    }
    
    #color-scheme {
      font-size: 9px !important;
    }

  
    
  }
  
  /* @media(prefers-color-scheme: dark){



    button.show-off-frames {
      background-color: transparent !important;
    }

    span.hints {
      color: black !important
    }

    .stickers  div span.anticon {
      color: black !important;
    }

    .stickers  div .sticker-data {
      color: black !important;
    }

    .controls-btn span {
      color: black !important
    }

    .qr {
      background-color: white !important;
    }

    .text-area {
      color: black !important;

      & * {
        color: black !important
      }
    }

    span#no-tasks {
      color: white !important;
    }
    
    #sticker-state {
      color: black !important;
    }


    #frame-message-no-data {
      color: white !important;
    }
    .main-content {
      background-color: #001529 !important;
    }

    .ant-input-textarea-show-count .ant-input-data-count {
      color: white;
    }

 
    
    .main-content li, p, ul{
      color: white !important;
    }
    .ant-typography {
      color: white;
    }
    
    .ant-typography {
      color: white !important;
    }
    .ant-typography .ant-typography-danger {
      color: #ff4d4f !important;
    }
    #descr {
      color: #001529 !important;
    }
    
    #descr ~ p {
      color: red !important;
    }
    .ant-modal-content .ant-modal-close {
      background-color: #F0F0F0 !important;
    }
    
    .ant-modal-content button:disabled span {
      color: #001529 !important;
    }
    .ant-modal-footer button:nth-child(1) span {
      color: #001529;
    }
    
    .ant-btn span {
      color: white;
    }
    
    .storage {
      color: white;
    }
    .anticon {
      color: white;
    }
    
    .ant-checkbox-wrapper {
      color: white;
    }
    .ant-btn-default {
      background: transparent !important;
    }
    
    .ant-message {
      color: #001529 !important;
    }
    
    #info h2 {
      color: white;
    }

    #html-btn {
      background-color: #1677FF;
    }
    
    .main-content #info .ant-collapse-content-box :where(li, span, ol) {
      color: #001529 !important;
    }
    
    #info .ant-collapse-header-text {
      color: white;
    }
    
    #info .ant-collapse-arrow {
      color: white;
    }

    .ant-popover-inner-content span {
      color: #ff4d4f !important;
    }

    .ant-popover-inner-content #no-btn span {
      color: white !important;
    }
    
    .ant-layout-has-sider .ant-layout {
      background-color: #001529 !important;
    }
  } */
  
    .react-player__preview {
    border-radius: 10px !important;
  }
  #frames iframe {
    border-radius: 10px !important;
  }
`

