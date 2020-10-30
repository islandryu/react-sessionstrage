import sessionstorage from "sessionstorage";
export default class SessionStorages {
  constructor() {
    this.eventListeners = [];
  }

  setItem(key, value) {
    value = JSON.stringify(value);
    sessionstorage.setItem(key, value);

    for (const eventListener of this.eventListeners) {
      eventListener();
    }
  }

  removeItem(key) {
    sessionstorage.removeItem(key);

    for (const eventListener of this.eventListeners) {
      eventListener();
    }
  }

  getItem(key) {
    const item = sessionstorage.getItem(key);
    return JSON.parse(item);
  }

  getAll() {
    const allItem = {};

    for (let i = 0; i < sessionstorage.length; i++) {
      const keyName = sessionstorage.key(i);
      allItem[keyName] = this.getItem(keyName);
    }

    return allItem;
  }

  addEventListener(callback) {
    this.eventListeners.push(callback);
  }

  removeEventListener(callback) {
    const index = this.eventListeners.indexOf(callback);
    this.eventListeners.splice(index, 1);
  }

}