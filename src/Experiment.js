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
            current_type: 'instructions'
        })
    }

    goToPhase() {
        this.setState({
            current_type: 'prephase'
        })
    }

    playCorrectAudio() {
        this.refs.IncorrectAudio.pause();
        this.refs.IncorrectAudio.currentTime = 0;
        this.refs.CorrectAudio.pause();
        this.refs.CorrectAudio.currentTime = 0;
        this.refs.CorrectAudio.play();
    }

    playIncorrectAudio() {
        this.refs.IncorrectAudio.pause();
        this.refs.IncorrectAudio.currentTime = 0;
        this.refs.CorrectAudio.pause();
        this.refs.CorrectAudio.currentTime = 0;
        this.refs.IncorrectAudio.play();
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
                                        {this.props.data.groups.map((group) => {
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
                {this.state.current_type === "instructions" ?
                    <div>
                        <p>{this.props.data.instructions}</p>
                        <audio ref="CorrectAudio">
                            <source src={process.env.PUBLIC_URL + "/" + this.props.data.correctAnswerAudio}
                                    type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                        <button className="btn btn-success" onClick={this.playCorrectAudio.bind(this)}>Correcto<i
                            className="material-icons">
                            play_circle_filled
                        </i></button>
                        <audio ref="IncorrectAudio">
                            <source src={process.env.PUBLIC_URL + "/" + this.props.data.incorrectAnswerAudio}
                                    type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                        <button className="btn btn-danger" onClick={this.playIncorrectAudio.bind(this)}>Incorrecto<i
                            className="material-icons">
                            play_circle_filled
                        </i></button>

                        <button className="btn btn-primary" onClick={this.goToPhase.bind(this)}>Siguiente</button>
                    </div> : ''
                }
                {this.state.current_type === "prephase" ?
                    <Phase correctAudio={this.props.data.correctAnswerAudio}
                           incorrectAudio={this.props.data.incorrectAnswerAudio}
                           data={this.props.data.phases[this.state.current_phase]}/> : ''
                }
            </div>
        );
    }
}

export default Experiment;