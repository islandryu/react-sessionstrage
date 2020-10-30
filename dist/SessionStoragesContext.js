import { createContext } from "react";
import SessionStorages from "./SessionStorages";
const SessionStoragesContext = /*#__PURE__*/createContext(new SessionStorages());
export const {
  Provider
} = SessionStoragesContext;
export default SessionStoragesContext;