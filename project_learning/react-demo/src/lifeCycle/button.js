import React, { Component } from 'react'

export class Button extends Component {
    // 用不到可以不叫props参数
    constructor(props) {
        super(props)
        this.state = {
            liked: false
        }
        console.group('%c 1-初始化阶段','color:red', props, this.state)
    }

    componentWillMount() {
        // 在组件挂载前调用。具体是在调用render前调用。
        // 我们在这里去改变组件状态，减少组件刷新的次数。
        console.group('%c 2-组件挂载前', 'color:green')
    }

    componentDidMount() { 
        // render之后调用，可以获取dom节点。
        console.group('%c 4-组件挂载后', 'color:orange')
    }

    handleClick = () => {
        // setState会触发render
        this.setState(
            {liked: !this.state.liked}
        )
    }

    shouldComponentUpdate() {
        // 决定是否真的更新数据， return true更新，false不更新
        console.group('%c 5-组件内容是否更新', 'color:#00ae9d')
        console.log(this.state)
        // return false
        // 我们这返回的是false， 当我们click时，页面不会像以前一样变化。
        // 为了后面的测试，我们return true
        return true
    }
    
    componentWillUpdate() { 
        console.group('%c 6-组件内容将要更新', 'color:#8552a1')
    }

    componentDidUpdate() {
        console.group('%c 7-组件内容完成更新', 'color:#7fb801')
    }

    componentWillUnmount() {
        // 这里完成组件的卸载和数据的销毁，清除组件所有的setTimeout和
        // 事件监听。
        console.group('%c 8-组件销毁', 'color:#7fb801')
    }

    render() {
        let text = this.state.liked ? '喜欢' : '不喜欢'
        console.group('%c 3-组件加载或者数据更新', 'color:blue')
        return (
            <div>
                <p onClick={this.handleClick}>
                    我{text}React!
                </p>
            </div>
        )
    }
}

export default Button
