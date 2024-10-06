import React, { Component } from 'react'
import PropUsername from './username'

export class Logout extends Component {
    render() {
        return (
            <div>
                <p>{ this.props.username } log out!</p>

            </div>
        )
    }
}

export default PropUsername(Logout)