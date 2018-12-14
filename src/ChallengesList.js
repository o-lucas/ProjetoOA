import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BasicDefinitions from './assets/challenges/basic/definition.json';
import Navbar from './Navbar';
import './ChallengesList.css';

class ChallengesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: []
    };
  }

  componentWillMount() {
    switch (this.props.match.params.type) {
      case "basico":
        this.setState({ levels: BasicDefinitions });
        break;
      default:
        alert("Sá porra n existe");
    }
  }

  render() {
    return (
      <div className="ChallengesList">
        <Navbar></Navbar>
        <div className="container">
          {this.state.levels.map((_, index) => {
            if (index % 5 === 0) {
              var list = this.state.levels.slice(index, index + 5);
              return (
                <div className="row py-3">
                  {list.map((data) => {
                    return (
                      <div className="col-sm">
                        <div className="card level-1">
                          <div className="card-body">
                            <h5>{data.title}</h5>
                            <hr />
                            <div>{data.description}</div>
                          </div>
                          <a href={`/desafios/${this.props.match.params.type}/${data.id}`}><button>Continuar →</button></a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ChallengesList;
