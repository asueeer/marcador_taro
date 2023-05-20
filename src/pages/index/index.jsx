import {View, Image, Button} from '@tarojs/components'
import Taro, {useLoad, useRouter, useShareAppMessage} from '@tarojs/taro'
import './index.scss'
import {
  GlobalConstBackgroundImage,
  GlobalConstInviteButton,
  GlobalConstStartButton,
  GlobalConstTitleImage,
  URL
} from "../../util/const";
import {useContext, useState} from "react";
import {
  GlobalKeyPlayers,
  GlobalKeyRoomId,
  GlobalKeyRoomState,
  GlobalKeyToken,
  GlobalKeyUserInfo,
  KVContext
} from "../../context/kv";
import {api_end_game, api_enter_room, api_login, api_new_room, api_set_token, api_start_game} from "../../util/api";

const PlayerList = () => {
  const {store} = useContext(KVContext)
  const players = store[GlobalKeyPlayers]

  while (players?.length < 4) {
    players?.push(null)
  }

  return (
    <View className='player-list'>
      {
        players?.map((player) => {
          if (player === null) {
            return (
              <Button open-type='share' className='invite-button'>
                <Image
                  className='invite-button avatar' src={GlobalConstInviteButton}
                  onClick={() => {
                  }
                  }
                > </Image>
              </Button>
            )
          }
          return (
            // 这里套一个button只是为了样式能够统一
            <Button disabled='disabled' className='invite-button'>
              <Image className='avatar' src={player.head_url}>
              </Image>
            </Button>
          )
        })
      }
    </View>
  )
}


const needToRegisterErrCode = 500

const player_count = (players) => {
  let cnt = 0
  for (let i = 0; i < players?.length; i++) {
    if (players[i] !== null) {
      cnt++
    }
  }
  return cnt
}

export default function Index() {
  const {store, actions} = useContext(KVContext)
  const room = store[GlobalKeyRoomState]
  const router = useRouter()
  const {room_id} = router.params

  const handle_login = (r) => {
    if (r.data.code === 0) {
      actions.set(GlobalKeyUserInfo, r.data.user)
      actions.set(GlobalKeyToken, r.data.token)
      api_set_token(r.data.token)
      if (room_id != null) {
        api_enter_room(room_id, (resp) => {
          console.log(resp)
          // 102表示已经在房间里了
          if (resp.data.code === 0 || resp.data.code === 102) {
            actions.set(GlobalKeyRoomId, room_id)
            return
          }
          if (resp.data.code === 404) {
            try_new_room()
          }
        })
      } else {
        try_new_room()
      }
    } else {
      // 用户未注册, 需请求用户的头像和昵称, 然后进行注册
      if (r.data.code === needToRegisterErrCode) {
        Taro.showModal({
          title: '提示',
          content: '需要获取您的头像和昵称进行注册',
        }).then(r => {
          if (r.confirm) {
            Taro.getUserProfile({
              desc: '用于完善用户资料'
            }).then((r) => {
              try_login(r.userInfo)
            })
          } else if (r.cancel) {
            console.log("用户取消了登陆")
            console.log('fixme: 用户不同意获取头像和昵称, 待增加兜底逻辑')
          }
        })
      } else {
        console.log('handle_login: panic!')
      }
    }
  }

  const try_login = (userInfo) => {
    Taro.login({
      timeout: 1000,
    }).then((r) => {
      api_login(r.code, userInfo, handle_login)
    })
  }

  const try_new_room = () => {
    console.log("try_new_room")
    api_new_room((r) => {
      actions.set(GlobalKeyRoomId, r.data.room_id)
      actions.set(GlobalKeyRoomState, {...r.data?.room})
      actions.set(GlobalKeyPlayers, r.data?.room?.players)
    })
  }

  useLoad(() => {
    console.log('Page loaded.')
    try_login(null)
    console.log("user login done.")

    setTimeout(() => {
      setInterval(() => {
        actions.update_room_state(store[GlobalKeyRoomId])
      }, 2000)
    }, 2000)
  })

  useShareAppMessage(() => {
    return {
      title: '快来一起和我玩小游戏',
      path: `/pages/index/index?room_id=${room.room_id}`,
    }
  })

  // 如果房主开始游戏, 则立即进入游戏页面
  const [navi, setNavi] = useState(false);
  if (room?.state === 'playing' && !navi) {
    setNavi(true);
    Taro.navigateTo({
      url: '/pages/start/index'
    }).then(() => {
    })
  }
  if (room?.state === 'waiting' && navi) {
    setNavi(false)
  }

  return (
    <View className='index' style={
      {backgroundImage: URL(GlobalConstBackgroundImage)}
    }
    >
      <Image className='title' src={GlobalConstTitleImage}/>
      <PlayerList></PlayerList>
      <View onClick={() => {
        const player_cnt = player_count(store[GlobalKeyRoomState].players)
        if (player_cnt <= 1) {
          Taro.showToast({
            title: '一个人无法进行游戏',
            icon: 'none',
            duration: 2000
          }).then(() => {
          });
          return
        }
        api_start_game(store[GlobalKeyRoomId], r => {
          if (r.data.code !== 0) {
            Taro.showToast({
              title: r.data.msg,
              icon: 'none',
              duration: 2000
            }).then(r => {
            })
            return
          }
          if (room.state === 'end') {
            Taro.navigateTo({
              url: '/pages/end/index'
            }).then(r => {
              console.log(r)
            });
          } else {
            Taro.navigateTo({
              url: '/pages/start/index'
            }).then(r => {
              console.log(r)
            });
          }

        })
      }}
      >
        <Image className='start-button' src={GlobalConstStartButton}/>
      </View>
    </View>
  )
}
