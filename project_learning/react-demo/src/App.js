import React from 'react'
// import Fzindex from './fzPros'
import Zsindex from './zsPros'
import Main from './context/main'

export default function App() {
  return (
    <div>
      App page
      <hr color='red' />
      <Main/>
      {/* <p>以下是父子组件传值和校验</p>
      <Fzindex />*/}
      <hr color='green'/>
      <p>以下跨组件传值和校验</p>
      <Zsindex />
    </div>
  )
}


