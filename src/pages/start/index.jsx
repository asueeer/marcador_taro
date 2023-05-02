import {View, Image, Text} from '@tarojs/components'
import Taro, {useLoad} from '@tarojs/taro'
import './index.scss'
import {
  GlobalConstBackgroundImage, GlobalConstPlayerAvatarWithScore, GlobalConstPlayground, GlobalConstWaitForOthers, URL
} from "../../util/const";
import {GlobalKeyRoomState, GlobalKeyUserInfo, KVContext} from "../../context/kv";
// eslint-disable-next-line import/first
import {useContext} from "react";
import {api_choose_number} from "../../util/api";

export default function Start() {
  const {store, actions} = useContext(KVContext)
  const room = store[GlobalKeyRoomState]
  const user = store[GlobalKeyUserInfo]
  const my_team = actions.my_team()
  const player_frame = (player) => {
    return (<View className='player-frame' style={{
      backgroundImage: URL(GlobalConstPlayerAvatarWithScore), backgroundSize: 'cover',
    }}
    >
      <Image className='avatar' src={player?.head_url}>
      </Image>
      <Text className='player-frame-score'>{player?.score}</Text>
    </View>)
  }

  // 如果是公布结果，则跳转到公布结果页
  if (room.state === 'show_result') {
    Taro.navigateTo({
      url: '/pages/start/index'
    }).then(r => {
      console.log(r)
    });
  }

  useLoad(() => {
    actions.timely_update_room_state()
  })

  const node_color_style = (node) => {
    let style = 'number'
    if (my_team === "A") {
      if (node.color_show_a === 'grey') {
        style += ' number-normal'
      } else {
        style += ' number-selected'
      }
    } else {
      if (node.color_show_b === "grey") {
        style += ' number-normal'
      } else {
        style += ' number-selected-by-b'
      }
    }
    return style
  }

  const chosen = () => {
    const grid = room?.grid
    for (let i = 0; i < grid?.length; i++) {
      if (grid[i].choose_by_a_player_id === user.user_id) {
        return true
      }
      if (grid[i].choose_by_b_player_id === user.user_id) {
        return true
      }
    }
    return false
  }


  const render_number = (index) => {
    const grid_node = room?.grid[index]

    if (grid_node?.value === undefined || grid_node?.value === -1) {
      return null
    }


    // if (!grid_node?.hit) {
    //   style += ' number-normal'
    // } else {
    //   style += ' number-selected'
    // }

    return (
      <View className={node_color_style(grid_node)} onClick={() => {
        api_choose_number(room.room_id, room.state_id, index, (r) => {
          if (r.data.code === 0) {
            actions.set(GlobalKeyRoomState, r.data.room)
          }
        })
      }}
      >
        {grid_node?.value}
      </View>
    )
  }

  return (<View className='index' style={{backgroundImage: URL(GlobalConstBackgroundImage)}}>
    <View className='players'>
      {room?.players?.map((player) => {
        return player_frame(player)
      })}
    </View>
    <View className='playground' style={{
      backgroundImage: URL(GlobalConstPlayground), backgroundSize: 'cover',
    }}
    >
      <View className='numbers-row numbers-row1'>
        {render_number(0)}
        {render_number(1)}
        {render_number(2)}
        {render_number(3)}
      </View>

      <View className='numbers-row numbers-row2'>
        {render_number(4)}
        {render_number(5)}
        {render_number(6)}
        {render_number(7)}
      </View>

      <View className='numbers-row numbers-row3'>
        {render_number(8)}
        {render_number(9)}
        {render_number(10)}
        {render_number(11)}
      </View>

      <View className='numbers-row numbers-row4'>
        {render_number(12)}
        {render_number(13)}
        {render_number(14)}
        {render_number(15)}
      </View>
    </View>

    <Image src={GlobalConstWaitForOthers} style={{
      width: "100vw",
      height: "100vh",
      marginTop: "5vh",
      display: chosen() ? "" : "none",
    }}></Image>

  </View>)
}
