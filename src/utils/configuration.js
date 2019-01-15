import { Map } from "immutable";

let configuration = Map();

export function setConfiguration(name, value) {
  configuration = configuration.set(name, value);
}
export function unsetConfiguration(name) {
  configuration = configuration.delete(name);
}

export function getConfiguration(key) {
  if (!configuration.has(key)) {
    throw new Error("Undefined configuration key: " + key);
  }

  return configuration.get(key);
}
