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

    render() {
        let { name, msg, parentMsg} = this.state
        let { name: pName, msg: pMsg } = this.props 
        return (
            <div>
                child page
                <p>name: {name}</p>
                <p>msg: {msg}</p>
                <p>father: { parentMsg }:{pName}--{pMsg} </p>
                <input type="text" value={parentMsg} onChange={ this.handleChange }></input>
            </div>
        )
    }
}

export default Child
