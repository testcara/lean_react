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

    receiveDataFromChild = (data) => { 
        this.setState({
            data: data
        })    
    }

    render() {
        let { name, msg, data } = this.state

        return (
            <div>
                father page
                <p>name: {name}</p>
                <p>msg: {msg}</p>
                <p>msg from child: {data}</p>
                <hr />
                <Child {...this.state} fatherChange={this.fatherChange.bind(this)}
                    sendDataToFather={ this.receiveDataFromChild }
                />
                {/* <Child {...this.state}  /> */}
            </div>
        )
    }
}

export default Father
