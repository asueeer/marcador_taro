import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Result() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='result'>
      <Text>Hello world!</Text>
    </View>
  )
}
