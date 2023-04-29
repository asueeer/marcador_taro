import {useState} from "react";

const react = require("react");

// todo 当有新的全局状态时, 可在此处添加新的key
export const GlobalKeyUserInfo = "user"
export const GlobalKeyToken = "token"

export const GlobalKeyRoomId = "room_id"

export const GlobalKeyRoomState = "room_state"

export const KVContext = react.createContext(null)

let initialized = false
const kv_state = {}

function initialize_kv_state() {
  // don't change this
  if (initialized) {
    return
  }

  // todo 可在此处进行全局状态的初始化
  kv_state[GlobalKeyUserInfo] = null
  kv_state[GlobalKeyToken] = null
  kv_state[GlobalKeyRoomId] = null
  kv_state[GlobalKeyRoomState] = null

  // don't change this
  initialized = true
  return kv_state
}

// don't change this
export const KVProvider = (props) => {
  initialize_kv_state()
  const [store, setStore] = useState(kv_state);

  const set = (key, val) => {
    store[key] = val
    setStore({...store})
  }

  const [actions] = useState({
    set: set
  });


  return (<KVContext.Provider value={{store, actions}}>
    {props.children}
  </KVContext.Provider>)
}
