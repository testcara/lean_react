import React from 'react'
// import Fzindex from './fzPros'
// import Zsindex from './zsPros'
// import Main from './context/main'
import Button from './lifeCycle/button'

export default function App() {
  return (
    <div>
      App page
      <hr color='red' />
      {/* <Main/>
      <p>以下是父子组件传值和校验</p>
      <Fzindex />
      <hr color='green'/>
      <p>以下跨组件传值和校验</p>
      <Zsindex /> */}
      <Button />
      { 
        // 加上此代码后，我们只需要重新load下界面，就可以看到console输出
        // 组件销毁了。
        false ? <Button /> : 'haha'
      }
    </div>
  )
}


