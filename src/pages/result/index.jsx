import {Image, Text, View} from '@tarojs/components'
import Taro, {useLoad} from '@tarojs/taro'
import './index.scss'
import {
  GlobalConstBackgroundImage, GlobalConstDoneButton,
  GlobalConstPlayerAvatarWithScore,
  GlobalConstPlayground, node_color_style,
  URL
} from "../../util/const";
import {useContext, useState} from "react";
import {GlobalKeyPlayers, GlobalKeyRoomState, GlobalKeyUserInfo, KVContext} from "../../context/kv";
import {api_continue_game} from "../../util/api";

const player_frame = (player) => {
  const diff = () => {
    if (player?.diff > 0) {
      return (<Text className='player-frame-diff'>+{player?.diff}</Text>)
    }
    if (player?.diff < 0) {
      return (<Text className='player-frame-diff'>{player?.diff}</Text>)
    }
    return null
  }

  return (<View className='player-frame' style={{
    backgroundImage: URL(GlobalConstPlayerAvatarWithScore), backgroundSize: 'cover',
  }}
  >
    <Image className='avatar' src={player?.head_url}>
    </Image>
    <Text className='player-frame-score'>{player?.score}</Text>
    <Text className='player-frame-diff'>{diff()}</Text>
  </View>)
}
export default function Result() {
  const {store, actions} = useContext(KVContext)
  const room = store[GlobalKeyRoomState]
  const user = store[GlobalKeyUserInfo]
  const my_team = actions.my_team()
  const players = room?.players

  useLoad(() => {
    console.log('Page loaded.')
  })
  // console.log("hi")
  // // 如果是公布结果，则跳转到公布结果页
  const [navi, setNavi] = useState(false);
  if (room.state !== 'show_result' && !navi) {
    setNavi(true);
    if (room.state === 'end') {
      console.log('navi to end')
    }
    if (room.state === 'playing') {
      console.log("1111")
      Taro.navigateTo({
        url: '/pages/start/index'
      }).then(() => {
      })
    }
  }
  if (room.state === 'show_result' && navi) {
    setNavi(false)
  }


  const render_number = (index) => {
    const grid_node = room?.grid[index]

    if (grid_node?.value === undefined || grid_node?.value === -1) {
      return <View className='number'></View>
    }

    return (
      <View className={node_color_style(my_team, grid_node)}>
        {grid_node?.value}
      </View>
    )
  }

  return (
    <View className='index' style={{backgroundImage: URL(GlobalConstBackgroundImage)}}>
      <View className='players'>
        {players?.map((player) => {
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

      <Image src={GlobalConstDoneButton} className='done-button' onClick={() => {
        if (room?.owner_id === user?.user_id) {
          api_continue_game(room.room_id, (r) => {
            if (r.data.code === 0) {
              actions.set(GlobalKeyRoomState, r.data.room)
            }
          })
        } else {
          Taro.showToast({
            title: '请等待房主开始下一轮',
            icon: 'none',
            duration: 2000
          }).then(() => {
          });
        }
      }}
      >
      </Image>

    </View>
  )
}
