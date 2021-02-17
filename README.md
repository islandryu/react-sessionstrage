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

## useSessionStorage
####response
```
[sessionStorage,setSessionStorage,removeSessionStorage]
```
#### arguement
`string[]`
Put the session storage key in the array。
Rerendered when the sessionStorage keys contained in the array are updated.

## setSessionStorage
#### argument
`setSessionStorage("sesssionStoragekey","value")`
Set sessionStorage.

#### removeSessionStorage
#### argument
`removeSessionStorage("sesssionStoragekey")`
remove sessionStorage.

