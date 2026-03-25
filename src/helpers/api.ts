import { Dispatch } from "redux";
import http from "../constants/axios";
import { HTTPErrorResponse, HTTPResponse } from "../constants/config";
import {
  applyHttpServiceHandler,
  httpErrorHandler,
  httpResponseHandler,
} from "./handler";

const urlParams = (params: { [key: string]: any }) => {
  let paramsArray: Array<string> = [];
  Object.keys(params).forEach((key) => {
    if (params[key] !== "" && params[key] !== null) {
      paramsArray.push(`${key}=${params[key]}`);
    }
  });
  return paramsArray.join("&");
};

/**
 * Http get method request
 * @param {*} path
 * @param {*} params
 * @returns
 */
export const getRequest = async (
  path: string,
  params: any | null,
  dispatch: Dispatch,
): Promise<HTTPResponse | HTTPErrorResponse | undefined> => {
  try {
    const url = params ? `${path}?${urlParams(params)}` : path;
    const result = await http.get(url);
    const response = httpResponseHandler(result);
    await applyHttpServiceHandler(dispatch, response);
    return response;
  } catch (error) {
    const err = await httpErrorHandler(error, dispatch);
    await applyHttpServiceHandler(dispatch, err);
    return err;
  }
};

/**
 * Http post method request
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const postRequest = async (
  path: string,
  payload: any,
  dispatch: Dispatch,
) => {
  try {
    const result = await http.post(path, payload);
    const response = httpResponseHandler(result);
    await applyHttpServiceHandler(dispatch, response);
    return response;
  } catch (error) {
    const err = await httpErrorHandler(error, dispatch);
    await applyHttpServiceHandler(dispatch, err);
    return err;
  }
};

/**
 * Http put method request
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const putRequest = async (
  path: string,
  payload: any,
  dispatch: Dispatch,
) => {
  try {
    const result = await http.put(path, payload);
    const response = httpResponseHandler(result);
    await applyHttpServiceHandler(dispatch, response);
    return response;
  } catch (error) {
    const err = await httpErrorHandler(error, dispatch);
    await applyHttpServiceHandler(dispatch, err);
    return err;
  }
};

/**
 * Http delete method request
 * @param {*} path
 * @returns
 */
export const delRequest = async (path: string, dispatch: Dispatch) => {
  try {
    const result = await http.delete(path);
    const response = httpResponseHandler(result);
    await applyHttpServiceHandler(dispatch, response);
    return response;
  } catch (error) {
    const err = await httpErrorHandler(error, dispatch);
    await applyHttpServiceHandler(dispatch, err);
    return err;
  }
};
