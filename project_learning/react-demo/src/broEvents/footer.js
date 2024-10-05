import React, { Component } from 'react'
import eventBus from './event'

export class Footer extends Component {
    // 添加事件监听，监听从header组件发送过来的sayHello
    // 事件。addListener(监听的事件， 处理事件的函数)
    componentDidMount() {
        eventBus.addListener('sayHello', this.sayHelloListener)
    }

    componentWillUnmount() {
        eventBus.removeListener('sayHello', this.sayHelloListener)
    }

    sayHelloListener(a, b, c) {
        console.log(a, b, c)
    }

    render() {
        return (
            <div>
                footer page
            </div>
        )
    }
}

export default Footer
