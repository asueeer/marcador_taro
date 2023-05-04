import {View, Text, Image} from '@tarojs/components'
import {useLoad} from '@tarojs/taro'
import './index.scss'
import {GlobalConstBackgroundImage, GlobalConstPlayerAvatarWithScore, URL} from "../../util/const";
import {player_frame} from "../start";
import {useContext} from "react";
import {GlobalKeyRoomState, KVContext} from "../../context/kv";

const player_result = (player) => {
  return (<View className='player-result'>
    <Image className='avatar' src={player?.head_url}>
    </Image>
    <Text className='player-frame-score'>{player?.score}</Text>
  </View>)
}

export default function End() {
  const {store} = useContext(KVContext)
  const room = store[GlobalKeyRoomState]

  useLoad(() => {
    console.log('Page loaded.')
  })


  return (
    <View className='index' style={
      {backgroundImage: URL(GlobalConstBackgroundImage)}
    }
    >
      <View className='players'>
        {room?.players?.map((player) => {
          return player_result(player)
        })}
      </View>

    </View>
  )
}
