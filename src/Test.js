import React, {Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_type: 'initial',
            selection: -1,
            tries: 1
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

    select(id) {
        this.setState({
            selection: id
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    nextTest() {
        this.props.nextTest();
    }

    finishTest() {
        if (this.state.selection === this.props.data.possibilities.filter(p => p.isAnswer).id) {
            this.nextTest();
        } else {
            if (this.props.data.isRepeatable && this.state.tries < this.props.data.tries)
                this.setState({
                    current_type: "repeating"
                })
        }
    }

    repeatTest() {
        this.setState({
            tries: this.state.tries + 1,
            current_type: 'initial'
        });
        this.goToSelection();
    }

    getInitial() {
        return this.props.data.possibilities.filter((p) => p.isInitial);
    }

    render() {
        return (
            <div>
                {this.state.current_type === "initial" ?
                    <div className="container">
                        {this.getInitial().type === "SOUND" ?
                            <div>
                                <audio key={this.getInitial().idElement} controls>
                                    <source src={process.env.PUBLIC_URL + "/" + this.getInitial().pathSound}
                                            type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                                </audio>
                                :
                                <img key={this.getInitial().idElement}
                                     src={this.getInitial().pathImage}
                                     alt={this.getInitial().name} className="img-thumbnail"/>
                            </div> : ''
                        }
                    </div> : ''
                }
                {this.state.current_type === "selection" ?
                    <div className="container">
                        {this.props.data.possibilities.filter(p => !p.isInitial).map((possibility) => {
                            return possibility.type === "SOUND" ?
                                <audio key={possibility.idElement} onClick={this.select.bind(this, possibility.idElement)}
                                       controls>
                                    <source src={process.env.PUBLIC_URL + "/" + possibility.pathSound}
                                            type="audio/mpeg"/>
                                    Your browser does not support the audio element. </audio> :
                                <img key={possibility.idElement} onClick={this.select.bind(this, possibility.idElement)}
                                     src={possibility.pathImage}
                                     alt={possibility.name} className="img-thumbnail"/>
                        })}
                        <button type="submit" className="btn btn-primary"
                                onClick={this.finishTest.bind(this)}>Siguiente
                        </button>
                    </div> : ''
                }
                {this.state.current_type === "repeating" ?
                    <div className="container">
                        <h2>Fallaste la prueba, vuelve a intentarlo</h2>
                        <button type="submit" className="btn btn-primary"
                                onClick={this.repeatTest.bind(this)}>Siguiente
                        </button>
                    </div> : ''
                }
            </div>
        );
    }
}

export default Test;