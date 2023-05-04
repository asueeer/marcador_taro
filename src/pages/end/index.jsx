import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function End() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='end'>
      <Text>End!</Text>
    </View>
  )
}
