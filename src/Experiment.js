import React, {Component} from 'react';
import Phase from "./Phase";

class Experiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_type: 'main',
            current_test: '',
            current_phase: 0
        }
    }

    saveGroup(event) {
        //TODO save group
        event.preventDefault();
        this.setState({
            current_type: 'prephase'
        })
    }

    render() {
        return (
            <div className="App container">
                {this.state.current_type === "main" ?
                    <div>
                        <h1>{this.props.data.name}</h1>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="group" className="col-sm-2 col-form-label">Grupo</label>
                                <div className="col-sm-10">
                                    <select className="form-control form-control-lg">
                                        {this.props.data.grupos.map((group) => {
                                            return <option key={group.name}>{group.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary"
                                            onClick={this.saveGroup.bind(this)}>Siguiente
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div> : ''
                }
                {this.state.current_type === "prephase" ?
                    <Phase data={this.props.data.phases[this.state.current_phase]}/> : ''
                }
            </div>
        );
    }
}

export default Experiment;