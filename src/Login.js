import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        {/* Não faço a mínima ideia do que tô fazendo */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100" shapeRendering="geometricPrecision">
          <image id="coruja" xlinkHref="/assets/img/CorujaVerde.png" x="5%" y="79%" height="15" width="5" preserveAspectRatio="none">
            <animate attributeName="href" from="/assets/img/CorujaVerde.png" to="/assets/img/CorujaVerdeBlink.png"
              dur="1s" repeatCount="indefinite" />
          </image>

          <ellipse ry="10%" rx="60%" cy="100%" cx="50%" fill="#a7dda7" />

          <g transform="translate(10, 40)" fill="#d6d6d6">
            <ellipse ry="4.5" rx="5" cy="10" cx="1" />
            <ellipse ry="4" rx="4" cy="9.5" cx="5" />
            <ellipse ry="4" rx="3" cy="6" cx="1" />
            <ellipse ry="3" rx="2" cy="6.5" cx="5" />
            <animateTransform attributeName="transform" attributeType="XML" repeatCount="indefinite" from="150 40" to="-10 40" dur="15s"/>
          </g>

          <g transform="translate(80, 10)" fill="#d6d6d6" id="cloud">
            <ellipse ry="4.5" rx="5" cy="10" cx="1" />
            <ellipse ry="4" rx="4" cy="9.5" cx="5" />
            <ellipse ry="4" rx="3" cy="6" cx="1" />
            <ellipse ry="3" rx="2" cy="6.5" cx="5" />
            <animateTransform attributeName="transform" attributeType="XML" repeatCount="indefinite" from="110" to="-10" dur="15s"/>
          </g>

          <g transform="translate(80, 10)" fill="#d6d6d6" id="cloud">
            <ellipse ry="4.5" rx="5" cy="10" cx="1" />
            <ellipse ry="4" rx="4" cy="9.5" cx="5" />
            <ellipse ry="4" rx="3" cy="6" cx="1" />
            <ellipse ry="3" rx="2" cy="6.5" cx="5" />
            <animateTransform attributeName="transform" attributeType="XML" repeatCount="indefinite" from="180 30" to="-10 30" dur="20s"/>
          </g>

        </svg>

        <div className="intro container">
          <p className="h6 text-left">Conectar-se ao ambiente</p>
          <form action="/desafios">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i class="fas fa-at"></i></span>
              </div>
              <input type="email" className="form-control" placeholder="E-mail" /><br />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i class="fas fa-lock"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Senha" /><br />
            </div>
            <button type="submit" className="btn" id="intro-button"><i className="fas fa-sign-in-alt"></i> Entrar</button> <br/>
            <Link to="/desafios"><small className="text-dark">Esqueci minha senha</small></Link>
          </form>

          <hr />

          <ul id="signup-list">
            <li>
              <button onclick="googleLogin()" class="login-btn btn" id="login-google">
                <i className="fab fa-google"></i> Login com Google
              </button>
            </li>

            <li>
              <button onclick="ghLogin()" class="login-btn btn" id="login-gh">
                <i class="fab fa-github"></i> Login com Github
              </button>
            </li>

            <li>
              <button onclick="fbLogin()" class="login-btn btn" id="login-fb">
                <i class="fab fa-facebook-square"></i> Login com Facebook
              </button>
            </li>

            <li>
              <button onclick="ttLogin()" class="login-btn btn" id="login-tt">
                <i class="fab fa-twitter"></i> Login com Twitter
              </button>
            </li>
          </ul>
          <Link to="/desafios"><small className="text-dark">Ainda não possui uma conta? Clique e registre-se!</small></Link> <br />
          <Link to="/desafios"><small className="text-muted">Continuar sem conectar à uma conta</small></Link>
        </div>
      </div>
    );
  }
}

export default Login;