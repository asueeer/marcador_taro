import {View, Text, Image, Button} from '@tarojs/components'
import {useLoad} from '@tarojs/taro'
import './index.scss'
import {
  GlobalConstBackgroundImage,
  GlobalConstInviteButton,
  GlobalConstStartButton,
  GlobalConstTitleImage,
  URL
} from "../../util/const";

const PlayerList = () => {
  return (
    <View className={'player-list'}>
      <Image className={'invite-button avatar'} src={GlobalConstInviteButton}>
      </Image>
      <Image className={'invite-button avatar'} src={GlobalConstInviteButton}>
      </Image>
      <Image className={'invite-button avatar'} src={GlobalConstInviteButton}>
      </Image>
      <Image className={'invite-button avatar'} src={GlobalConstInviteButton}>
      </Image>
    </View>
  )
}

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index' style={
      {backgroundImage: URL(GlobalConstBackgroundImage)}
    }>
      <Image className='title' src={GlobalConstTitleImage}/>
      <PlayerList></PlayerList>
      <View>
        <Image className='start-button' src={GlobalConstStartButton}/>
      </View>
    </View>
  )
}
