import React, { Component } from 'react'

export class Functionroot extends Component {
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

function Header()  {
    console.log('header 组件渲染了')
    return (
        <div>
            header
        </div>
    )
}


function Main() {
    console.log('main 组件渲染了')
    return (
        <div>
            main
        </div>
    )
}

function Footer() {
    console.log('footer 组件渲染了')
    return (
        <div>
            footer
        </div>
    )
}

export default Functionroot