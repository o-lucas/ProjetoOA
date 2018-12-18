import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <div className="container">
          <div className="row py-3">
            <div className="col-sm">
              <div className="card" id="level-1">
                <div className="card-body">
                  <h4>Nível básico</h4>
                  <hr />
                  <div>  Descrição nível básico  </div>
                </div>
                <a href="/desafios/basico"><button style={{ backgroundColor: "#398689" }} className="redirectToLevels">Continuar →</button></a>
              </div>
            </div>
            <div className="col-sm">
              <div className="card" id="level-2">
                <div className="card-body">
                  <h5>Nível 2</h5>
                  <hr style={{ borderColor: "#7e9aaa" }} />
                  <div>  Descrição nível 2  </div>
                </div>
                <button style={{ backgroundColor: "#325A70" }} className="redirectToLevels"> Continuar →</button>
              </div>
            </div>

            <div className="col-sm">
              <div className="card" id="level-3">
                <div className="card-body">
                  <h5>Nível 3</h5>
                  <hr style={{ borderColor: "#f2b544" }} />
                  <div>  Descrição nível 3  </div>
                </div>
                <button style={{ backgroundColor: "#a65814" }} className="redirectToLevels">Continuar →</button>
              </div>
            </div>

            <div className="col-sm">
              <div className="card" id="level-4">
                <div className="card-body">
                  <h5>Nível 4</h5>
                  <hr />
                  <div>  Descrição nível 4  </div>
                </div>
                <button style={{ backgroundColor: "#735645" }} className="redirectToLevels">Continuar →</button>
              </div>
            </div>
          </div>
          <div className="row mt-5 justify-content-between">
            <div className="col-sm-6 col-md-5" id="achievements">
              <h4>Conquistas</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    Andarilho
                      <small className="d-block">Andou 10 blocos</small>
                  </span>
                  <span className="badge badge-success badge-pill"><i className="fas fa-check"></i></span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    Maratonista
                      <small className="d-block">Andou 100 blocos</small>
                  </span>
                  <span className="badge badge-danger badge-pill"><i className="fas fa-times"></i></span>
                </li>
              </ul>
            </div>

            <div className="col-sm-6 col-md-4" id="resources">
              <h4>Recursos</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><i className="fas fa-video"></i> Vídeos</li>
                <li className="list-group-item"><i className="fas fa-font"></i> Fórum</li>
                <li className="list-group-item"><i className="fas fa-comments"></i> Chat</li>
                <li className="list-group-item"><i className="fas fa-question-circle"></i> Perguntas frequentes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
