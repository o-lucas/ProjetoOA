import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import BasicDefinitions from './assets/challenges/basic/definition.json';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: {
        id: 0,
        type: '',
        length: 0,
      }
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const type = this.props.match.params.type;

    if (id != null) {
      switch (type) {
        case "basico":
          this.setState({ level: { id: id, type: 'basico', length: BasicDefinitions.length } });
          break;
        default:
          console.log('sei lá mano');
      }
    }
  }

  render() {
    return (
      <div className="Navbar">
        <div className="container-fluid p-0">
          <nav className="navbar navbar-expand-lg m-0">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Início</Link>
                </li>
                <li className="nav-item">
                  <Link to="/desafios" className="nav-link">Desafios</Link>
                </li>
                <li className="nav-item">
                  <Link to="/tutorial" className="nav-link">Tutorial</Link>
                </li>
                <li className="nav-item">
                  <Link to="/sobre" className="nav-link">Sobre</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contato" className="nav-link">Contato</Link>
                </li>
              </ul>
            </div>

            {this.state.level.length > 0 ?
              <div className="collapse navbar-collapse w-90 justify-content-center">
                <Link to={"/desafios/" + this.state.level.type}>{"Nível " + this.state.level.type}</Link>
                <div className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                    Desafio {this.state.level.id}
                  </a>
                  <ul id="level-navigation" className="dropdown-menu col-12" aria-labelledby="navbarDropdown">
                    {Array(this.state.level.length).fill(null).map((value, index) => {
                      return <li>
                        <a href={"/desafios/" + this.state.level.type + "/" + (index + 1)} className="dropdown-item">{index + 1}</a>
                      </li>;
                    })}
                    {/* <li><a class="dropdown-item current" href="../challenge1/">1</a></li>
                        <li><a class="dropdown-item" href="../challenge2/">2</a></li>
                        <li><a class="dropdown-item" href="../challenge3/">3</a></li>
                        <li><a class="dropdown-item" href="../challenge4/">4</a></li>
                        <li><a class="dropdown-item" href="../challenge5/">5</a></li>
                        <li><a class="dropdown-item" href="../challenge6/">6</a></li>
                        <li><a class="dropdown-item" href="#">7</a></li>
                        <li><a class="dropdown-item" href="#">8</a></li>
                        <li><a class="dropdown-item" href="#">9</a></li>
                        <li><a class="dropdown-item" href="#">10</a></li>
                        <li><a class="dropdown-item" href="../challenge11/">11</a></li>
                        <li><a class="dropdown-item" href="#">12</a></li> */}
                  </ul>
                </div>
              </div>
              :
              null
            }
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
