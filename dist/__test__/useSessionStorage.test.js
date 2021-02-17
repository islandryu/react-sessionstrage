import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import useSessionStorage from "../useSessionStorage";
import SessionStorageProvider from "../SessionStorageProvider";
import SessionStorages from "../SessionStorages";
import { SearchSource } from "jest";

function TestComponent({
  dependencies
}) {
  const [sessionStorages, setSessionStorage, removeSessionStorage] = useSessionStorage(dependencies);

  const setItem = () => {
    setSessionStorage("test", "hoge");
  };

  return /*#__PURE__*/React.createElement("div", {
    onClick: setItem
  }, sessionStorages.test);
}

let sessionStorageObj = new SessionStorages();
beforeEach(() => {
  sessionStorage.clear();
  sessionStorageObj = new SessionStorages();
});
describe("useSessionStorage", () => {
  it("provides session storage", () => {
    sessionStorageObj.setItem("test", "test");
    sessionStorageObj.setItem("hoge", "test");
    const {
      container,
      getByText,
      debug
    } = render( /*#__PURE__*/React.createElement(SessionStorageProvider, null, /*#__PURE__*/React.createElement(TestComponent, {
      dependencies: ["test"]
    })));
    expect(getByText("test")).toBeInTheDocument();
  });
  it("re-render if a dependency changes", () => {
    sessionStorageObj.setItem("test", "test");
    const {
      container,
      getByText,
      rerender
    } = render( /*#__PURE__*/React.createElement(SessionStorageProvider, null, /*#__PURE__*/React.createElement(TestComponent, {
      dependencies: ["test"]
    })));
    act(() => {
      fireEvent.click(getByText("test"));
    });
    rerender( /*#__PURE__*/React.createElement(SessionStorageProvider, null, /*#__PURE__*/React.createElement(TestComponent, {
      dependencies: ["test"]
    })));
    expect(getByText("hoge")).toBeInTheDocument();
  });
  it("does not re-render if no dependency changes", () => {
    sessionStorageObj.setItem("test", "test");
    const {
      container,
      getByText,
      rerender
    } = render( /*#__PURE__*/React.createElement(SessionStorageProvider, null, /*#__PURE__*/React.createElement(TestComponent, null)));
    act(() => {
      fireEvent.click(getByText("test"));
    });
    expect(getByText("test")).toBeInTheDocument();
  });
});