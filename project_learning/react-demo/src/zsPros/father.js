import React, { Component } from 'react'
import Child from './child'

export class Father extends Component {
    state = {
        name: ""
    }

    handleChange = (e) => { 
        this.setState(
            {name: e.target.value}
        )
    }
    render() {
        let { name } = this.state
        return (
            <div>
              father page
                <input type='text' name={name} value={this.props.value}
                    onChange={this.handleChange}></input>
                <Child {...this.props} />
            </div>
        )
    }
}

export default Father