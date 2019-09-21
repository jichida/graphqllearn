import { put, takeLatest, call } from "redux-saga/effects";
// import { push } from "react-router-redux";
// import { showNotification } from "react-admin";
import {
  FINDONE,
  FINDONE_LOADING,
  FINDONE_FAILURE,
  FINDONE_SUCCESS
} from "./action";
import { fetchJson } from "../../util/fetch.js";
import config from "../../env/config";

export default function* singleDoucmentPageSaga() {
  yield takeLatest(FINDONE, function*(action) {
    const { payload } = action;
    try {
      const token = localStorage.getItem("admintoken");
      const url = `${config.serverurl}/findone/${payload.resource}`;
      const options = {
        method: "POST",
        user: {
          authenticated: true,
          token:token
        },
      };

      yield put({
        type: FINDONE_LOADING,
        payload: { resource: payload.resource }
      });
      const { json } = yield call(fetchJson, url, options);
      // debugger;
      yield put({
        type: FINDONE_SUCCESS,
        payload: { resource: payload.resource, json }
      });
    } catch (e) {
      console.log(e)
      // debugger;
      yield put({
        type: FINDONE_FAILURE,
        payload: { resource: payload.resource }
      });
    }
  });
}
