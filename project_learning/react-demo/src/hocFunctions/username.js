import React, { Component } from 'react'

function PropUsername(CallbackComponent) {
    class NewComponent extends Component {
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
            return <CallbackComponent username={ this.state.username} />
        }
    }
    return NewComponent
    
}

export default PropUsername
