import React, { Component } from 'react'
import Hello from './hello'
import MainContext from './context'

export class Main extends Component {
    render() {
        return (
            <div>
                <MainContext.Provider value='casey'>
                    Main page
                    <Hello />
                </MainContext.Provider>
            </div>
        )
    }
}

export default Main
