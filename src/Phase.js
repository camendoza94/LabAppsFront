import React, {Component} from 'react';
import Test from "./Test";

class Phase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_type: 'prephase',
            current_test: 0
        }
    }

    start() {
        this.setState({
            current_type: 'test'
        })
    }

    nextTest() {
        this.setState({
            current_test: this.state.current_test + 1
        })
    }

    render() {
        return (
            <div>
                {this.state.current_type === "prephase" ?
                    <div className="container">
                        <h2>{this.props.data.instructions}</h2>
                        <audio controls>
                            <source src={process.env.PUBLIC_URL + "/" + this.props.data.instructionsSoundPath}
                                    type="audio/mpeg"/>
                            Your browser does not support the audio element. </audio> :
                        <button type="submit" className="btn btn-primary"
                                onClick={this.start.bind(this)}>Siguiente
                        </button>
                    </div> : ''
                }
                {this.state.current_type === "test" ?
                    <Test nextTest={this.nextTest.bind(this)} data={this.props.data.tests[this.state.current_test]} key={this.state.current_test}/> : ''
                }
            </div>

        );
    }
}

export default Phase;