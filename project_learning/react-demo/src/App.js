import React from 'react'
import Fzindex from './fzPros'
import Zsindex from './zsPros'

export default function App() {
  return (
    <div>
      App page
      <hr color='red'/>
      <p>以下是父子组件传值和校验</p>
      <Fzindex />
      <hr color='green'/>
      <p>以下时爷孙组件传值和校验</p>
      <Zsindex />
    </div>
  )
}


