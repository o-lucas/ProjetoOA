import React, { Component } from 'react';
import Navbar from './Navbar';
import BasicControls from './assets/challenges/basic/controls.json';
import './Challenge.css';

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: []
    };
  }
  componentDidMount() {
    const type = this.props.match.params.type;
    const id = this.props.match.params.id;

    const gameScript = document.createElement('script');
    gameScript.async = false;
    gameScript.src = `/assets/challenges/${type}/${id}/game.js`;

    switch (type) {
      case "basico":
        this.setState({ controls: BasicControls[id - 1].controls });
        break;
      default:
        console.log("sei lá mano");
    }

    const blocklyResizer = document.createElement('script');
    blocklyResizer.async = false;
    blocklyResizer.src = '/assets/js/BlocklyResizer.js';

    window.onload = function () {
      //document.body.appendChild(controlsScript);
      document.body.appendChild(blocklyResizer);
      document.body.appendChild(gameScript);
    }
  }

  render() {
    return (
      <div className="Challenge">
        <Navbar></Navbar>
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <div id="helper">
            <span id="helper-text">Helper</span>
          </div>
          <div id="mainDiv">
            <div id="blocklyDiv" style={{ position: 'relative' }}></div>
            <xml id="toolbox" style={{ display: 'none' }}>
              {this.state.controls.map((control) => {
                return <block type={control}></block>
              })}
            </xml>
          </div>

          <div id="codeDiv">
            <pre>
              <code id="codeToHighlight" className="python"></code>
            </pre>
          </div>

          <div id="gameDiv">
            <div id="game"></div>
            <button id="runGame">Executar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Challenge;
