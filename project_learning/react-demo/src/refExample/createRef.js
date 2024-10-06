import React, { createRef, Component } from 'react'

export class Createref extends Component {
    constructor() { 
        super()
        this.headRef = createRef()
        this.inputRef = createRef()
        this.pRef = createRef()
    }

    render() {
        return (
            <div>
                <Header ref={this.headRef} />
                <button onClick={this.changeText}>点击</button>
                <hr />
                <p ref={this.pRef}>等待修改</p>
                <input type='text' onChange={this.changeInput}
                    ref={this.inputRef}></input>
            </div>
        )
    }

    changeText = () => { 
        console.log(this.headRef.current.state.name)
    }

    changeInput = () => {
        this.pRef.current.innerHTML = this.inputRef.current.value
    }
}

export class Header extends Component {
    state = {
        name: 'casey'
    }
    render() {
        return (
            <div>
                head component
            </div>
        )
    }
}

export default Createref
