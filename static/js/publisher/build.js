import React from "react";
import ReactDOM from "react-dom";
import BuildController from "./build/buildController";

const initBuild = (selector, snap, user) => {
  ReactDOM.render(
    <BuildController snap={snap} user={user} />,
    document.querySelector(selector)
  );
};

export { initBuild };
