import React, { Component } from 'react'
import Child from './child'
export class Father extends Component {
    constructor() { 
        super()
        this.state = {
            name: "the middle",
            msg: "good developer",
        }
    }

    fatherChange(data) { 
        this.setState({
            msg: data
        })
    }

    render() {
        let { name, msg } = this.state

        return (
            <div>
                father page
                <p>name: {name}</p>
                <p>msg: {msg}</p>
                <hr />
                <Child {...this.state} fatherChange={this.fatherChange.bind(this)} />
                {/* <Child {...this.state}  /> */}
            </div>
        )
    }
}

export default Father
