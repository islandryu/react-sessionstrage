import { createContext } from "react";
import SessionStorages from "./SessionStorages";

const SessionStoragesContext = createContext(new SessionStorages());

export const { Provider } = SessionStoragesContext;
export default SessionStoragesContext;
