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
    this.tooltip = React.createRef();
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
            if (index % 4 === 0) {
              var list = this.state.levels.slice(index, index + 4);
              return (
                <div className="row py-3 justify-content-center" key={index}>
                  {list.map((data) => {
                    return (
                      <div className={data.id === "final" ? "col-sm-6" : "col-sm"} key={data.id}>
                        <div className="card level-1">
                          <div className="card-body">
                            <div className="card-title">
                              <h5>{data.title} <i className="fas fa-search float-right" id={data.id} ref={this.tooltip} data-toggle="tooltip" data-html="true" title={`<img src="${data.background}" />`}></i></h5>
                              <small className="text-right"><i className="fas fa-star"></i> {data.score}</small>
                            </div>
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
