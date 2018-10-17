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
                        {this.props.data.attributes.map((attribute) => {
                            return <h2 key={attribute.name}>{attribute.value}</h2>
                        })}
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