# react-sessionstorage

You can use session storage with hooks. Since it is shared in the context, it will be re-rendered when the dependencies are updated.

## install
```
npm install react-sessionstorage
```

## How to use

```javascript
import React from "react";
import ReactDOM from "react-dom";
import {
  SessionStorageProvider,
  useSessionStorage,
} from "react-sessionstorage";

const Component = () => {
  return (
    <SessionStorageProvider>
      <ChildComponent />
    </SessionStorageProvider>
  );
};

function ChildComponent() {
  const [
    sessionStorages,
    setSessionStorage,
    removeSessionStorage,
  ] = useSessionStorage(["test"]);
  const setItem = () => {
    setSessionStorage("test", "hoge");
  };

  return <button onClick={setItem}>{sessionStorages.test}</button>;
}

ReactDOM.render(<Component />, document.getElementById("app"));
```
