import React, { Component } from 'react'

export class Logout extends Component {
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
                <p>{ this.state.username } log out!</p>

            </div>
        )
    }
}

export default Logout