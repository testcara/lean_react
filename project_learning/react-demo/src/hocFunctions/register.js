import React, { Component } from 'react'

export class Register extends Component {
    state = {
        username: ''
    }

    componentDidMount() { 
        let username = 'admin'
        this.setState({
            username: username
        })
    }
    
    render() {
        return (
            <div>
                <p>{ this.state.username } registe!</p>

            </div>
        )
    }
}

export default Register