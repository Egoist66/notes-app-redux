import ReactDOM from 'react-dom/client';
import App from './components/Layout/App';
import {GlobalStyle} from "./styles/global";
import {StateProvider} from "./redux/store";
import {BrowserRouter} from "react-router-dom";

import "driver.js/dist/driver.css";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <>

        <BrowserRouter>


            <GlobalStyle/>
            <StateProvider>
                <App/>
            </StateProvider>


        </BrowserRouter>


    </>
);


