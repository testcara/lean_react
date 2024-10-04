import React, { Component } from 'react'

export class Child extends Component {
    constructor(props) { 
        super()
        this.state = {
            name: "the young",
            msg: "new bee",
            parentMsg: props.msg
        }
    }

    handleChange = (e) => { 
        this.setState(
            {parentMsg: e.target.value}
        )
        this.props.fatherChange(e.target.value)
    }

    sendData = () => { 
        this.props.sendDataToFather('hello, father!')
    }

    render() {
        let { name, msg, parentMsg} = this.state
        let { name: pName, msg: pMsg } = this.props 
        return (
            <div>
                child page
                <p>name: {name}</p>
                <p>msg: {msg}</p>
                <p>father: {parentMsg}:{pName}--{pMsg} </p>
                <button onClick={this.sendData}>send data to father</button>
                <br/>
                <label>change father msg:
                    <br/>
                    <input type="text" value={parentMsg} onChange={this.handleChange}></input>
                </label>
            </div>
        )
    }
}

export default Child
