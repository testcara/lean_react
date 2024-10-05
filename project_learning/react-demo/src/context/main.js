import React, { Component } from 'react'
import Hello from './hello'
import MainContext from './context'

export class Main extends Component {
    render() {
        return (
            <div>
                <MainContext.Provider value={{name:'casey', age: '10'}}>
                    Main page
                    <hr/>
                    <Hello />
                </MainContext.Provider>
            </div>
        )
    }
}

export default Main
