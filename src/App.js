import React, {Component} from 'react';
import Experiment from './Experiment'
import './App.css';

class App extends Component {

    data = {
        name: "Experimento 1",
        groups: [
            {
                name: "Grupo 1",
                instructions: "Instrucciones"
            },
            {
                name: "Grupo 2",
                instructions: "Instrucciones"
            },
        ],
        phases: [
            {
                name: "Fase 1",
                attributes: [{
                    name: "Instrucciones",
                    value: "Instrucciones aquí"
                }],
                tests: [
                    {
                        name: "Test 1",
                        initial: {
                            name: "A",
                        },
                        possibilities: [
                            {
                                name: "B",
                            },
                            {
                                name: "C",
                            }
                        ],
                        answer: {
                            name: "A",
                        }
                    },
                    {
                        name: "Test 2",
                        initial: {
                            name: "A",
                        },
                        possibilities: [
                            {
                                name: "B",
                            },
                            {
                                name: "C",
                            }
                        ],
                        answer: {
                            name: "A",
                        }
                    }
                ]
            },
            {
                name: "Fase 2",
                attributes: []
            },
        ]

    };

    render() {
        return (
            <div className="App">
                <Experiment data={this.data}/>
            </div>
        );
    }
}

export default App;
