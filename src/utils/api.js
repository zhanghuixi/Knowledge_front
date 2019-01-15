import HttpError from "standard-http-error";
import { getAuthenticationToken } from "./authentication";
import { getConfiguration } from "./configuration";

//默认超时时间
const TIMEOUT = 60000 * 5;

/**
 * http get 请求
 * @param {*} path 相对于配置的API服务节点路径
 * @param {*} suppressRedBox 如果为true将不输出错误信息
 * @returns {Promise} response 的body
 */
export async function get(path, suppressRedBox) {
  if (typeof suppressRedBox == "undefined") {
    suppressRedBox = getConfiguration("SuppressRedBox");
  }
  return bodyOf(request("get", path, null, suppressRedBox));
}
/**
 * http post 请求
 * @param {*} path
 * @param {*} body
 * @param {*} suppressRedBox
 */
export async function post(path, body, suppressRedBox=true) {
  if (typeof suppressRedBox == "undefined") {
    suppressRedBox = getConfiguration("SuppressRedBox");
  }
  return bodyOf(request("post", path, body, suppressRedBox));
}
/**
 * http put 请求
 * @param {*} path
 * @param {*} body
 * @param {*} suppressRedBox
 */
export async function put(path, body, suppressRedBox) {
  if (typeof suppressRedBox == "undefined") {
    suppressRedBox = getConfiguration("SuppressRedBox");
  }
  return bodyOf(request("put", path, body, suppressRedBox));
}
/**
 * http delete 请求
 * @param {*} path
 * @param {*} suppressRedBox
 */
export async function del(path, suppressRedBox) {
  if (typeof suppressRedBox == "undefined") {
    suppressRedBox = getConfiguration("SuppressRedBox");
  }
  return bodyOf(request("delete", path, null, suppressRedBox));
}

export async function request(method, path, body, suppressRedBox) {
  try {
    const response = await sendRequest(method, path, body);
    return handleResponse(response);
  } catch (error) {
    if (!suppressRedBox) {
      logError(error, url(path), method);
    }
    throw error;
  }
}
async function sendRequest(method, path, body) {
  try {
    const endpoint = url(path);
    const token = await getAuthenticationToken();
    const headers = getRequestHeaders(body, token);
    const options = body
      ? { method, headers, body: JSON.stringify(body) }
      : { method, headers };
    return timeout(fetch(endpoint, options), TIMEOUT);
  } catch (error) {
    throw new Error(error);
  }
}
async function handleResponse(response) {
  try {
    const status = response.status;
    if (status >= 400) {
      const message = await getErrorMessageSafely(response);
      const httpError = new HttpError(status, message);
      throw httpError;
    }
    const responseBody = await response.text();
    return {
      status: response.status,
      headers: response.headers,
      body: responseBody ? JSON.parse(responseBody) : null
    };
  } catch (error) {
    throw error;
  }
}
export function url(path) {
  const apiRoot = getConfiguration("API_ROOT");
  return path.indexOf("/") === 0 ? apiRoot + path : `${apiRoot}/${path}`;
}
export function getRequestHeaders(body, token) {
  const headers = body
    ? { Accept: "application/json", "Content-Type": "application/json" }
    : { Accept: "application/json" };

  if (token) {
    return { ...headers, token };
  }

  return headers;
}
function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}
async function getErrorMessageSafely(response) {
  try {
    const body = await response.text();
    if (!body) {
      return "";
    }

    const payload = JSON.parse(body);
    if (payload && payload.message) {
      return payload.message;
    }

    return body;
  } catch (e) {
    return response._bodyInit;
  }
}
async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return response.body||"";
  } catch (error) {
    throw error;
  }
}
function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error._bodyInit}`;
    console.error(
      `API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`
    );
  } else {
    console.error(
      `API request ${method.toUpperCase()} ${endpoint} failed with message "${
        error.message
      }"`
    );
  }
}
