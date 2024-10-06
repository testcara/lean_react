import React, { Component } from 'react'

class Boy extends Component {
    render() {
        return (
            <div>
                Boy page
                <p>I'm {this.props.name},{this.props.age} and like {this.props.hobby }
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

class Main extends Component {
    render() {
        return (
        <div>
            <Boy name='John' age='15' hobby='dancing' />
            <Gril name='Casey' age='15' hobby='dancing' />
        </div>
        )
    }
}

export default Main