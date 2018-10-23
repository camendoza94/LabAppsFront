import React, {Component} from 'react';
import Experiment from './Experiment'
import './App.css';
import axios from 'axios';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8090/api/catalogo/experiment')
            .then((response) => {
                this.setState({
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        const data = this.state.data;
        return (
            <div className="App">
                {data ?
                	<Experiment data={data}/>
                	: 'CARGANDO'
            	}
            </div>
        );
    }
}

export default App;
