import React, { Component } from 'react'
import PropUsername from './username'

export class Login extends Component {
    render() {
        return (
            <div>
                <p>{ this.props.username } log in!</p>
            </div>
        )
    }
}

export default PropUsername(Login)