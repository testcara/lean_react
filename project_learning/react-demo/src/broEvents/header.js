import React, { Component } from 'react'
import eventBus from './event'

export class Header extends Component {
    send = () => { 
        let name = "像风一样自由"
        let arr = [1, 2, 3]
        let obj = {
            name: 'casey',
            age: 18
        }

        // 发送事件，emit(事件名，参数)
        eventBus.emit('sayHello', name, arr, obj)
    }

    render() {
        return (
            <div>
                header page
                <button onClick={this.send}>发送事件给footer组件</button>
            </div>
        )
    }
}

export default Header