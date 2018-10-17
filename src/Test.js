import React, {Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_type: 'initial',
        }
    }

    componentDidMount() {
        this.goToSelection();
    }

    async goToSelection() {
        await this.sleep(5000);
        this.setState({
            current_type: 'selection'
        })
    }

    select() {
        //TODO select
        this.playSound();
    }

    playSound() {
        //TODO play sound
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    nextTest(){
        this.props.nextTest();
    }

    render() {
        return (
            <div>
                {this.state.current_type === "initial" ?
                    <div className="container">
                        <h2>{this.props.data.initial.name}</h2>
                    </div> : ''
                }
                {this.state.current_type === "selection" ?
                    <div className="container">
                        {this.props.data.possibilities.map((possibility) => {
                            return <h2 onClick={this.select.bind(this)} key={possibility.name}>{possibility.name}</h2>
                        })}
                        <button type="submit" className="btn btn-primary"
                                onClick={this.nextTest.bind(this)}>Siguiente
                        </button>
                    </div> : ''
                }
            </div>

        );
    }
}

export default Test;