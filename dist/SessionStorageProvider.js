import React from "react";
import { Provider } from "./SessionStoragesContext";
import SessionStorages from "./SessionStorages";
export default (({
  children
}) => {
  return /*#__PURE__*/React.createElement(Provider, {
    value: new SessionStorages()
  }, children);
});