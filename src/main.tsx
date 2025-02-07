import "regenerator-runtime/runtime";

import ReactDOM from "react-dom/client";
import App from "./components/Layout/App";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";

import { Providers } from "./store/Providers";
import { GoogleTranslate } from "./service-components/GoogleTranslate";

import "driver.js/dist/driver.css";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <GoogleTranslate />

    <BrowserRouter>
      <GlobalStyle />
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </>
);
