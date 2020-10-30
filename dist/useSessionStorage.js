import { useState, useEffect, useContext, useMemo } from "react";
import SessionStoragesContext from "./SessionStoragesContext";
export default function useSessionStorage(dependencies) {
  const SessionStoragesObj = useContext(SessionStoragesContext);
  const [sessionStorages, setSessionStorages] = useState(SessionStoragesObj.getAll());
  useEffect(() => {
    function onChange() {
      const newSessionStorages = SessionStoragesObj.getAll();

      if (shouldUpdate(dependencies, newSessionStorages, sessionStorages)) {
        setSessionStorages(newSessionStorages);
      }
    }

    SessionStoragesObj.addEventListener(onChange);
    return () => {
      SessionStoragesObj.removeEventListener(onChange);
    };
  }, [SessionStoragesObj]);
  const setSessionStorage = useMemo(() => SessionStoragesObj.setItem.bind(SessionStoragesObj), [sessionStorages]);
  const removeSessionStorage = useMemo(() => SessionStoragesObj.removeItem.bind(SessionStoragesObj), [sessionStorages]);
  return [sessionStorages, setSessionStorage, removeSessionStorage];
}

function shouldUpdate(dependencies, newSessionStorages, oldSessionStorages) {
  if (!dependencies) {
    return false;
  }

  for (let dependency of dependencies) {
    if (newSessionStorages[dependency] !== oldSessionStorages[dependency]) {
      return true;
    }
  }

  return false;
}