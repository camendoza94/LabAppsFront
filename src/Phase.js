import React, {Component} from 'react';
import Test from "./Test";

class Phase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_type: 'prephase',
            current_test: 0,
            hits: 0,
            repeat: false,
            data: [],
            block: 1
        }
    }

    start() {
        this.setState({
            current_type: 'test'
        })
    }

    nextTest(correct, timer, answer) {
        this.setState({
            data: [...this.state.data, {
                "phase": this.props.data.idPhase + 1,
                "block": this.state.block,
                "test_number": this.state.current_test + 1,
                "test_type": this.props.data.tests[this.state.current_test].name,
                "test": this.props.data.tests[this.state.current_test].initial.name + ";" + this.props.data.tests[this.state.current_test].possibilities.filter(p => p.isAnswer)[0].name,
                "givenAnswer": this.props.data.tests[this.state.current_test].possibilities.filter(p => p.idElement === answer)[0].name,
                "hit": correct ? 1 : 0,
                "reactionTime": timer
            }]
        });
        if (correct)
            this.setState({
                hits: this.state.hits + 1
            });
        if (this.state.current_test + 1 < this.props.data.tests.length)
            this.setState({
                current_test: this.state.current_test + 1
            });
        else {
            this.props.nextPhase(this.state.hits, this.state.data);
        }
    }

    componentWillReceiveProps(props) {
        const {repeat} = this.props;
        if (props.repeat !== repeat) {
            this.setState({
                repeat: !repeat,
                current_type: 'test',
                current_test: 0,
                hits: 0,
                data: []
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.current_type === "prephase" ?
                    <div className="container">
                        <p>{this.props.data.instructions}</p>
                        <audio controls>
                            <source src={process.env.PUBLIC_URL + "/" + this.props.data.audioInstructions}
                                    type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                        <button type="submit" className="btn btn-primary"
                                onClick={this.start.bind(this)}>Siguiente
                        </button>
                    </div> : ''
                }
                {this.state.current_type === "test" ?
                    <Test correctAudio={this.props.correctAudio}
                          incorrectAudio={this.props.incorrectAudio} nextTest={this.nextTest.bind(this)}
                          data={this.props.data.tests[this.state.current_test]} key={this.state.current_test}
                          repeat={this.state.repeat}
                    /> : ''
                }
            </div>

        );
    }
}

export default Phase;