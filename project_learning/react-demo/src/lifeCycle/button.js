import React, { Component } from 'react'

export class Button extends Component {
    constructor() {
        super()
        this.state = {
            liked: false
        }
    }

    handleClick = () => {
        this.setState(
            {liked: !this.state.liked}
        )
    }

    render() {
        let text = this.state.liked ? '喜欢' : '不喜欢'
        console.log(text)
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
