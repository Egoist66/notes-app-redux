import ReactDOM from 'react-dom/client';
import App from './components/Layout/App';
import {GlobalStyle} from "./styles/global";
import {StateProvider} from "./redux/store";
import {BrowserRouter} from "react-router-dom";

import "driver.js/dist/driver.css";
import {hydrate, render} from "react-dom";


const rootElement = document.getElementById("root") as HTMLElement;
const _App = (
    <>
        <div id="google_translate_element"></div>

        <BrowserRouter>


            <GlobalStyle/>
            <StateProvider>
                <App/>
            </StateProvider>


        </BrowserRouter>


    </>
)

if (rootElement.hasChildNodes()) {
    hydrate(_App, rootElement);
} else {
    render(_App, rootElement);
}



