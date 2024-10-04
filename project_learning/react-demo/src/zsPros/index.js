import React, { Component } from 'react'
import Father from './father'

export class Zsindex extends Component {
    state = {
        list: [
            { 'id': 1, 'value': 'red' },
            { 'id': 2, 'value': 'blue' },
            { 'id': 3, 'value': 'green'},
        ],
        color: 'red'
    }

    handleChange = (e) => {
        this.setState({
            color: e.target.value
        })
    }

    render() {
        let { list, color } = this.state
        return (
            <div>
                <p>index page</p>
                <label>set the color for child:
                    <select value={ color } onChange={ this.handleChange }>
                        {list.map(item => <option key={item.id}>
                            {item.value}</option>)}
                    </select>
                    <hr/>
                    {list.map(item => <Father key={item.id} value={item.value}
                        color={ color } />)}
                </label>

            </div>
        )
    }
}

export default Zsindex
