import React from "react";
import { Provider } from "./SessionStoragesContext";
import SessionStorages from "./SessionStorages";

export default ({ children }) => {
  return <Provider value={new SessionStorages()}>{children}</Provider>;
};
