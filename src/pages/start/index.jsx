import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Start() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='start'>
      <Text>Start</Text>
    </View>
  )
}
