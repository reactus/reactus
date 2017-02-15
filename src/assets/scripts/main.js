import React from "react";
import ReactDOM from "react-dom";
import Routers from "./routers/index";
import FastClick from "fastclick";
import "./../styles/main.scss";

import { AppContainer } from 'react-hot-loader';

FastClick.attach(document.body);

ReactDOM.render(
  <AppContainer>
      <Routers />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) module.hot.accept();
