import {useState} from "react";
import {api_query_room} from "../util/api";

const react = require("react");

// todo 当有新的全局状态时, 可在此处添加新的key
export const GlobalKeyUserInfo = "user"
export const GlobalKeyToken = "token"

export const GlobalKeyRoomId = "room_id"

export const GlobalKeyRoomState = "room_state"

export const GlobalKeyPlayers = "players"

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
  kv_state[GlobalKeyRoomId] = 0
  kv_state[GlobalKeyRoomState] = null
  kv_state[GlobalKeyPlayers] = null

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
  const timely_update_room_state = () => {
    setTimeout(() => {
      api_query_room(store[GlobalKeyRoomId], (r) => {
        if (r.data.code === 0) {
          actions.set(GlobalKeyRoomState, {...r.data.room})
          actions.set(GlobalKeyPlayers, r.data.room?.players)
        }
      })
      timely_update_room_state()
    }, 2000)
  }

  const my_team = () => {
    const players = store[GlobalKeyRoomState]?.players
    if (players?.length === 0) {
      return null
    }
    const me = store[GlobalKeyUserInfo]
    for (let i = 0; i < players.length; i++) {
      if (me?.user_id === players[i]?.user_id) {
        return players[i].team
      }
    }
    return null
  }

  const [actions] = useState({
    set: set,
    timely_update_room_state: timely_update_room_state,
    my_team: my_team
  });


  return (<KVContext.Provider value={{store, actions}}>
    {props.children}
  </KVContext.Provider>)
}
