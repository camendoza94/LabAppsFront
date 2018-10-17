import React, {Component} from 'react';
class Phase extends Component {
    render() {
        return (
            <div className="container">
                {this.props.data.attributes.map((attribute) => {
                    return <h2 key={attribute.name}>{attribute.value}</h2>
                })}
            </div>
        );
    }
}

export default Phase;