import React, { Component } from 'react'

export class Child extends Component {
    render() {
        return (
        <div>
                child page
                <button style={{ "color": this.props.color }}>
                    {this.props.value}</button>
                
        </div>
        )
    }
}

export default Child
