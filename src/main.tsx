import "regenerator-runtime/runtime";

import ReactDOM from "react-dom/client";
import App from "./components/Layout/App";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";

import "driver.js/dist/driver.css";
import { Providers } from "./store/Providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <div id="google_translate_element"></div>

    <BrowserRouter>
      <GlobalStyle />
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </>
);
