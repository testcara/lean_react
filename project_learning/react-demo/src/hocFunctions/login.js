import React, { Component } from 'react'

export class Login extends Component {
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
                <p>{ this.state.username } log in!</p>

            </div>
        )
    }
}

export default Login