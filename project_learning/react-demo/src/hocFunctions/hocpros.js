import React, { Component } from 'react'

class Boy extends Component {
    render() {
        return (
            <div>
                Boy page
                <p>I'm {this.props.name}, {this.props.age} and like {this.props.hobby }
                </p>
            </div>
        )
    }
}

class Gril extends Component {
    render() {
        return (
            <div>
                Gril page
                <p>I'm {this.props.name}, {this.props.age} and like {this.props.hobby}
                </p>
        </div>
        )
    }
}

const PropsComponent = (Component) => { 
    const NewComponent = (props) => { 
        return <Component {...props} age='15' hobby='dancing' />
    }
    return NewComponent
}

const NewBoy = PropsComponent(Boy)
const NewGril = PropsComponent(Gril)

class Main extends Component {
    render() {
        return (
        <div>
            <NewBoy name='John' />
            <NewGril name='Casey' />
        </div>
        )
    }
}

export default Main