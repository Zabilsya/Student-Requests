import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {setupStore} from "./store/store";
import {Provider} from "react-redux";
import {Global} from "@emotion/react";

import 'normalize.css';
import {global} from "./const/styles";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore()

root.render(
    <Provider store={store}>
        <Global styles={global} />
        <App />
    </Provider>
);
