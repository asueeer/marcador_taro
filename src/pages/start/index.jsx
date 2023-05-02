import {View, Image, Text} from '@tarojs/components'
import {useLoad} from '@tarojs/taro'
import './index.scss'
import {
  GlobalConstBackgroundImage, GlobalConstPlayerAvatarWithScore, GlobalConstPlayground, URL
} from "../../util/const";
import {GlobalKeyRoomState, KVContext} from "../../context/kv";
// eslint-disable-next-line import/first
import {useContext} from "react";

export default function Start() {
  const {store, actions} = useContext(KVContext)
  const room = store[GlobalKeyRoomState]
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

  useLoad(() => {
    actions.timely_update_room_state()
  })

  const render_number = (index) => {
    const grid_node = room?.grid[index]

    if (grid_node?.value === undefined || grid_node?.value === -1) {
      return null
    }
    let style = 'number'
    if (!grid_node?.hit) {
      style += ' number-normal'
    } else {
      style += ' number-selected'
    }

    return (
      <View className={style} onClick={()=>{
        console.log("choose!")
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

  </View>)
}
