import Taro from "@tarojs/taro";
import {BaseUrl} from "./const";

let token = ""


export const api_set_token = (_token) => {
  token = _token
}


export const api_login = (code, userInfo, callback) => {
  Taro.request({
    method: 'POST',
    url: BaseUrl + '/wx_login',
    data: {
      wx_code: code,
      head_url: userInfo?.avatarUrl,
      nickname: userInfo?.nickName
    },
    header: {
      'content-type': 'application/json',
      'token': token
    },
  }).then((r) => {
    callback(r)
  })
}


export const api_new_room = (callback) => {
  Taro.request({
    method: "POST",
    url: BaseUrl + '/new_room',
    header: {
      'content-type': 'application/json',
      'token': token
    },
  }).then((r) => {
    callback(r)
  })
}

export const api_query_room = (room_id, callback) => {
  Taro.request({
    method: "POST",
    url: BaseUrl + '/room',
    data: {
      room_id: `${room_id}`,
    },
    header: {
      'content-type': 'application/json',
      'token': token
    },
  }).then((r) => {
    callback(r)
  })
}

export const api_start_game = (room_id, callback) => {
  Taro.request({
    method: "POST",
    url: BaseUrl + '/start_game',
    data: {
      room_id: `${room_id}`,
    },
    header: {
      'content-type': 'application/json',
      'token': token
    },
  }).then((r) => {
    callback(r)
  })
}

export const api_choose_number = (room_id, state_id, index, callback) => {
  Taro.request({
    method: "POST",
    url: BaseUrl + '/choose_number',
    data: {
      room_id: `${room_id}`,
      state_id: state_id,
      index: index,
    },
    header: {
      'content-type': 'application/json',
      'token': token
    },
  }).then((r) => {
    callback(r)
  })
}

export const api_continue_game = (room_id, callback) => {
  Taro.request({
    method: "POST",
    url: BaseUrl + '/continue_game',
    data: {
      room_id: `${room_id}`,
    },
    header: {
      'content-type': 'application/json',
      'token': token
    },
  }).then((r) => {
    callback(r)
  })
}

export const api_end_game = (room_id, callback) => {
  Taro.request({
    method: "POST",
    url: BaseUrl + '/end_game',
    data: {
      room_id: `${room_id}`,
    },
    header: {
      'content-type': 'application/json',
      'token': token
    },
  }).then((r) => {
    callback(r)
  })
}

export const api_restart_game = (room_id, callback) => {
  Taro.request({
    method: "POST",
    url: BaseUrl + '/restart_game',
    data: {
      room_id: `${room_id}`,
    },
    header: {
      'content-type': 'application/json',
      'token': token
    },
  }).then((r) => {
    callback(r)
  })
}
