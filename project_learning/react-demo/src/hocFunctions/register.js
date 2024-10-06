import React, { Component } from 'react'
import PropUsername from './username'

export class Register extends Component {    
    render() {
        return (
            <div>
                <p>{ this.props.username } registe!</p>

            </div>
        )
    }
}

export default PropUsername(Register)