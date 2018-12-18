import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        {/* Não faço a mínima ideia do que tô fazendo */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100" shapeRendering="geometricPrecision">
          <image id="coruja" xlinkHref="/assets/img/CorujaVerde.png" x="5%" y="79%" height="15" width="5" preserveAspectRatio="none">
            <animate attributeName="href" from="/assets/img/CorujaVerde.png" to="/assets/img/CorujaVerdeBlink.png"
              dur="1s" repeatCount="indefinite" />
          </image>

          <ellipse ry="10%" rx="60%" cy="100%" cx="50%" fill="#a7dda7" />

          <g transform="translate(10, 40)" fill="#d6d6d6">
            <ellipse ry="4.5" rx="5" cy="10" cx="1" />
            <ellipse ry="4" rx="5" cy="9.5" cx="5" />
            <ellipse ry="4" rx="3" cy="6" cx="1" />
            <ellipse ry="3" rx="2" cy="6.5" cx="5" />
          </g>

          <g transform="translate(80, 10)" fill="#d6d6d6">
            <ellipse ry="4.5" rx="5" cy="10" cx="1" />
            <ellipse ry="4" rx="5" cy="9.5" cx="5" />
            <ellipse ry="4" rx="3" cy="6" cx="1" />
            <ellipse ry="3" rx="2" cy="6.5" cx="5" />
          </g>
        </svg>

        <div className="intro">
          <h2><span>Projeto</span><span style={{color: '#A7DDA7'}}>OA</span></h2>
          <p>Se até agora você achava que programar era uma tarefa difícil ou mesmo quase impossível, <br />
            isso é porque você ainda não tentou desenvolver suas habilidades lógicas e computacionais a partir da <br />
            programação em blocos. <br />
            Que tal experimentar um ambiente divertido e desafiador com diferentes jogos virtuais? <br />
            E aí? Está preparado para embarcar nessa? <br />
          </p>
          <Link to="/login"><button id="intro-button"><i class="far fa-play-circle"></i> Começar</button></Link>
        </div>
      </div>
    )
  }
}

export default Landing;