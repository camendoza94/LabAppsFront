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
                        isRepeatable: true,
                        initial: {
                            name: "A",
                        },
                        possibilities: [
                            {
                                id: 2,
                                name: "B",
                                type: "image",
                                imagePath: "https://via.placeholder.com/350x150"
                            },
                            {
                                id: 3,
                                name: "C",
                                type: "image",
                                imagePath: "https://via.placeholder.com/350x150"
                            }
                        ],
                        answer: {
                            id: 3
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
                                type: "sound",
                                soundPath: "horse.mp3"
                            },
                            {
                                name: "C",
                                type: "sound",
                                soundPath: "horse.mp3"
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
