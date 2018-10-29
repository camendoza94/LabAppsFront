import React, {Component} from 'react';
import Phase from "./Phase";
import axios from 'axios';

class Experiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType: 'main',
            currentPhase: 0,
            repeat: false,
            data: []
        }
    }

    saveGroup(event) {
        //TODO save group
        event.preventDefault();
        this.setState({
            currentType: 'instructions'
        })
    }

    goToPhase() {
        this.setState({
            currentType: 'prephase'
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

    nextPhase(hits, data) {
        this.setState({
            data: this.state.data.concat(...data)
        });
        if (hits < this.props.data.phases[this.state.currentPhase].hits) {
            if (this.props.data.phases[this.state.currentPhase].isRepeatable)
                this.setState({
                    repeat: !this.state.repeat,
                });
            else if (this.props.data.phases[this.state.currentPhase].previousPhaseOnError) {
                this.setState({
                    currentPhase: this.state.currentPhase - 1
                });
            }
        } else {
            if (this.state.currentPhase + 1 < this.props.data.phases.length) {
                this.setState({
                    currentPhase: this.state.currentPhase + 1
                });
            }
            else {
                this.sendAnswers();
                this.setState({
                    currentType: 'end'
                });
            }
        }
    }

    sendAnswers() {
        this.state.data.map(answer => axios.post('http://localhost:8090/api/catalogo/answer', answer)
            .then((response) => {
                this.setState({
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log(error)
            }))
    }

    render() {
        return (
            <div className="App container">
                {this.state.currentType === "main" ?
                    <div>
                        <h1>{this.props.data.name}</h1>
                        <form>
                            {Object.keys(this.props.data.grupos[0].subjects[0]).map((attribute) => {
                                return <div className="form-group row">
                                    <label htmlFor={attribute}
                                           className="col-sm-2 col-form-label">{attribute}</label>
                                    <div className="col-sm-10">
                                        <input className="form-control form-control-lg" id={attribute}/>
                                    </div>
                                </div>
                            })}
                            <div className="form-group row">
                                <label htmlFor="group" className="col-sm-2 col-form-label">Grupo</label>
                                <div className="col-sm-10">
                                    <select className="form-control form-control-lg" id="group">
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
                {this.state.currentType === "instructions" ?
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
                {this.state.currentType === "prephase" ?
                    <Phase key={this.state.currentPhase}
                           correctAudio={this.props.data.correctAnswerAudio}
                           incorrectAudio={this.props.data.incorrectAnswerAudio}
                           data={this.props.data.phases[this.state.currentPhase]}
                           nextPhase={this.nextPhase.bind(this)}
                           repeat={this.state.repeat}
                    /> : ''
                }
                {this.state.currentType === "end" ?
                    <h1>Fin del experimento</h1> : ''
                }
            </div>
        );
    }
}

export default Experiment;