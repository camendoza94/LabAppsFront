import React, {Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType: 'initial',
            selection: -1,
        };
    }

    goToSelection() {
        this.setState({
            currentType: 'selection'
        });
        this.startTimer();
    }

    startTimer() {
        this.mountTime = new Date().getTime()
    }

    stopTimer() {
        this.timer = new Date().getTime() - this.mountTime;
    }

    select(id) {
        if (this.state.currentType !== "finishing")
            this.setState({
                selection: id
            });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    nextTest() {
        this.props.nextTest(this.state.correct, this.timer, this.state.selection);
    }

    async modal() {
        await this.sleep(2000);
        this.setState({
            modal: false
        });
    }

    async finishTest() {
        if (this.state.selection === -1) {
            this.setState({
                modal: true
            }, this.modal);
            return
        }
        this.stopTimer();
        if (this.state.selection === this.props.data.possibilities.filter(p => p.isAnswer)[0].idElement) {
            this.setState({
                correct: true
            });
            this.playCorrectSound();
        }
        else {
            this.setState({
                correct: false
            });
            this.playIncorrectSound();
        }
        await this.sleep(1200);
        this.nextTest();
    }

    playCorrectSound() {
        this.refs.CorrectAudio.play();
    }

    playIncorrectSound() {
        this.refs.IncorrectAudio.play();
    }

    componentWillReceiveProps(props) {
        const {repeat} = this.props;
        if (props.repeat !== repeat) {
            this.setState({
                currentType: "initial",
                selection: -1,
            });
        }
    }


    render() {
        return (
            <div>
                {this.state.currentType === "initial" ?
                    <div className="container">
                        {this.props.data.initial.type === "SOUND" ?
                            <audio key={this.props.data.initial.idElement} controls>
                                <source src={process.env.PUBLIC_URL + "/" + this.props.data.initial.path}
                                        type="audio/mpeg"/>
                                Your browser does not support the audio element.
                            </audio>
                            :
                            <img key={this.props.data.initial.idElement}
                                 src={this.props.data.initial.path}
                                 alt={this.props.data.initial.name} className="img-thumbnail"/>
                        }
                        <button type="submit" className="btn btn-primary"
                                onClick={this.goToSelection.bind(this)}>Siguiente
                        </button>
                    </div> : ''
                }
                {this.state.currentType === "selection" || this.state.currentType === "finishing" ?
                    <div className="container">
                        <audio ref="CorrectAudio">
                            <source src={process.env.PUBLIC_URL + "/" + this.props.correctAudio}
                                    type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                        <audio ref="IncorrectAudio">
                            <source src={process.env.PUBLIC_URL + "/" + this.props.incorrectAudio}
                                    type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                        {this.props.data.possibilities.map((possibility) => {
                            return <div key={possibility.idElement}> {possibility.type === "SOUND" ?
                                <audio className={this.state.selection === possibility.idElement ? "selected" : ''}
                                       key={possibility.idElement}
                                       onClick={this.select.bind(this, possibility.idElement)}
                                       controls>
                                    <source src={process.env.PUBLIC_URL + "/" + possibility.path}
                                            type="audio/mpeg"/>
                                    Your browser does not support the audio element. </audio> :
                                <img key={possibility.idElement} onClick={this.select.bind(this, possibility.idElement)}
                                     src={possibility.path}
                                     alt={possibility.name}
                                     className={'img-thumbnail' + (this.state.selection === possibility.idElement ? " selected" : '')}/>}
                            </div>
                        })}
                        <button type="submit" className="btn btn-primary"
                                onClick={this.finishTest.bind(this)}>Siguiente
                        </button>
                        {this.state.modal ?
                            <div className="alert alert-danger" role="alert">
                                Selecciona una respuesta antes de continuar.
                            </div> : ''
                        }
                    </div> : ''
                }
            </div>
        );
    }
}

export default Test;