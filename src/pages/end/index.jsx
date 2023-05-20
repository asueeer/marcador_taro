import {View, Text, Image} from '@tarojs/components'
import Taro, {useLoad} from '@tarojs/taro'
import './index.scss'
import {GlobalConstBackgroundImage, GlobalConstNewRound, GlobalConstWinner, URL} from "../../util/const";
import {useContext} from "react";
import {GlobalKeyRoomState, KVContext} from "../../context/kv";
import {api_end_game, api_restart_game} from "../../util/api";

const player_result = (player, index) => {
  const avatar = () => {
    if (index === 0) {
      return (<View className='avatar-winner-container'>
          <Image className='avatar' src={player?.head_url}>
          </Image>
          <Image className='winner' src={GlobalConstWinner}></Image>
        </View>
      )
    }
    return (<Image className='avatar' src={player?.head_url}>
    </Image>)
  }


  return (<View className='player-result-card'>
    {avatar()}
    <Text className='end-page-player-frame-score'>{player?.score}</Text>
  </View>)
}

export default function End() {
  const {store} = useContext(KVContext)
  const room = store[GlobalKeyRoomState]
  const players = []

  for (let i = 0; i < room?.players?.length; i++) {
    if (room.players[i] !== null) {
      players.push(room.players[i])
    }
  }

  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < players.push(); j++) {
      if (players[i].score > players[j].score) {
        const tmp = players[i].score
        players[i].score = players[j].score
        players[j].score = tmp
      }
    }
  }

  useLoad(() => {
    console.log('Page loaded.')
  })


  return (
    <View className='index' style={
      {backgroundImage: URL(GlobalConstBackgroundImage)}
    }
    >
      <View className='players'>
        {players?.map((player, index) => {
          return player_result(player, index)
        })}
      </View>
      <Image className='new-round' src={GlobalConstNewRound} onClick={() => {
        Taro.showActionSheet({
          itemList: ['还和ta玩', '全新一局'],
        }).then((r) => {
          if (r.tapIndex === 0) {
            api_restart_game(room.room_id, (r) => {
              console.log(r)
              if (r.data.code === 0) {
                Taro.navigateTo({
                  url: '/pages/start/index'
                })
              } else {
                Taro.showToast({
                  title: r.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
          if (r.tapIndex === 1) {
            api_end_game(room.room_id, (r) => {
              console.log(r)
              Taro.reLaunch({
                url: '/pages/index/index'
                // eslint-disable-next-line no-shadow
              });
            })
          }
        })
      }}
      >

      </Image>

    </View>
  )
}
