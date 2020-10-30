import SessionStorages from "../SessionStorages";
let sessionStoragesObj = new SessionStorages();
beforeEach(() => {
  sessionStorage.clear();
  sessionStoragesObj = new SessionStorages();
});
describe("setItem(key,value)", () => {
  it("set value of String with key", () => {
    sessionStoragesObj.setItem("keyname", "value");
    expect(JSON.parse(sessionStorage.__STORE__["keyname"])).toBe("value");
  });
  it("set value of Object with key", () => {
    const expected = {
      test: "test"
    };
    sessionStoragesObj.setItem("keyname", expected);
    expect(sessionStoragesObj.getItem("keyname")).toEqual(expected);
  });
});
describe("getItem(key)", () => {
  it("get value from sessionstrage by key", () => {
    sessionStoragesObj.setItem("keyname", "value");
    expect(sessionStoragesObj.getItem("keyname")).toEqual("value");
  });
});
describe("getAll()", () => {
  it("get all value from sessionstrage", () => {
    const item1 = "test";
    const item2 = {
      test: "test"
    };
    sessionStoragesObj.setItem("item1", item1);
    sessionStoragesObj.setItem("item2", item2);
    const expected = {
      item1: "test",
      item2: {
        test: "test"
      }
    };
    expect(sessionStoragesObj.getAll()).toEqual(expected);
  });
});
describe("removeItem(key)", () => {
  it("remove value from session storage", () => {
    sessionStoragesObj.setItem("test", "test");
    expect(sessionStoragesObj.getItem("test")).toBe("test");
    sessionStoragesObj.removeItem("test");
    expect(sessionStoragesObj.getItem("test")).toBe(null);
  });
});
describe("addEventListener(callback)", () => {
  it("execute callback when session storage value changes", () => {
    const callback = jest.fn();
    sessionStoragesObj.addEventListener(callback);
    sessionStoragesObj.setItem("test", "test");
    expect(callback.mock.calls.length).toBe(1);
  });
  it("execute callback when session storage is removed", () => {
    const callback = jest.fn();
    sessionStoragesObj.addEventListener(callback);
    sessionStoragesObj.setItem("test", "test");
    expect(sessionStoragesObj.eventListeners[0]).toBe(callback);
    expect(callback.mock.calls.length).toBe(1);
    sessionStoragesObj.removeItem("test");
  });
});
describe("removeEventListener(callback)", () => {
  it("remove EventListener", () => {
    const callback = jest.fn();
    sessionStoragesObj.addEventListener(callback);
    sessionStoragesObj.setItem("test", "test");
    expect(callback.mock.calls.length).toBe(1);
    sessionStoragesObj.removeEventListener(callback);
    sessionStoragesObj.setItem("test", "hoge");
    expect(callback.mock.calls.length).toBe(1);
  });
});