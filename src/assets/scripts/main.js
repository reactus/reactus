import React from "react";
import ReactDOM from "react-dom";
import Routers from "./routers/index";
import FastClick from "fastclick";
import "./../styles/main.scss";

FastClick.attach(document.body);

const render = Component =>
  ReactDOM.render(
      <Component />, document.getElementById("root")
  );

render(Routers);

if (module.hot) module.hot.accept('./routers', () => render(Routers));
