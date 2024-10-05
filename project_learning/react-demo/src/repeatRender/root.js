import React, { Component } from 'react'

export class Root extends Component {
    state = {
        num: 0
    }

    onClick = () => { 
        this.setState({
            num: this.state.num  +1
        })
    }
    render() {
        console.log('root 组件渲染了')
        return (
            <div>
                root page
                <Header />
                <Main />
                <Footer />
                <button onClick={this.onClick}>点我+1</button>
                <p>{ this.state.num }</p>
            </div>
        )
    }
}

class Header extends Component {
    render() {
        console.log('header 组件渲染了')
        return (
            <div>
                header
            </div>
        )
    }
}

class Main extends Component {
    render() {
        console.log('main 组件渲染了')
        return (
            <div>
                main
            </div>
        )
    }
}

class Footer extends Component {
    render() {
        console.log('footer 组件渲染了')
        return (
            <div>
                footer
            </div>
        )
    }
}

export default Root