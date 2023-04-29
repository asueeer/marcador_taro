import Taro, {useLaunch} from '@tarojs/taro'
import './app.scss'
import {BaseUrl} from "./util/const";
import {KVProvider} from "./context/kv";

function App({children}) {


  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <KVProvider>
      {children}
    </KVProvider>
  )
}

export default App
