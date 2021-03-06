import React from 'react';
import bind from 'react-autobind';
import Game from 'Game/index.js'
import Walker from './Walker';
import Background from './Setting/background';
import Foreground from './Setting/foreground';
import Door from './Door';
import Information from './Information';
import FPSCounter from './Information/FPScounter';
import { walkers } from './level.json';

class Prototype02 extends React.Component {
  constructor() {
    super();
    bind(this);
    this.bindKeyHandlers();
    const fps = 0;
    this.state = {
      canOpen: false,
      currentDoorFrame: 0,
      doorStatus: 'closed',
      currentDoorInputEvent: null,
      fps,
      information: {},
      walkers,
    };
  }

  componentDidMount() {
    this.gameCanvas.appendChild(Game.view);
    Game.start();
    this.renderFPSCounter();
    this.getLastGitCommit();
  }

  componentWillUnMount() {
    Game.stop();
  }

  bindKeyHandlers() {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 32 && this.state.status !== 'opening' && this.state.canOpen === true) {
        // this.updateDoorStatus('opening');
        this.updateCurrentDoorInputEvent('door--keydown');
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 32 && this.state.status !== 'closing') {
        // this.updateDoorStatus('closing');
        this.updateCurrentDoorInputEvent('door--keyup');
      }
    });
  }

  getLastGitCommit() {
    fetch('/api/last-git-commit')
      .then(response => response.json())
      .then(latestGitCommit => this.setState({ information: latestGitCommit }))
      .catch(err => console.warn(err));
  }

  renderFPSCounter() {
    Game.ticker.add((delta) => {
      const fps =  Math.round(Game.ticker.FPS);
      this.setState({ fps });
    })
  }

  updateCanOpenStatus(canOpen) {
    if (this.state.canOpen !== canOpen) {
      this.setState({ canOpen });
    }
  }

  updateCurrentDoorFrame(currentDoorFrame) {
    if (this.state.currentDoorFrame !== currentDoorFrame) {
      this.setState({ currentDoorFrame });
    }
  }

  updateCurrentDoorInputEvent(currentDoorInputEvent) {
    if (this.state.currentDoorInputEvent !== currentDoorInputEvent) {
      this.setState({ currentDoorInputEvent })
    }
  }

  updateDoorStatus(doorStatus) {
    // if (this.state.doorStatus !== doorStatus) {
      this.setState({ doorStatus });
    // }
  }

  render() {
    return (
      <div
        className="prototype"
        ref={thisDiv => this.gameCanvas = thisDiv}
      >
        <Background
          position={{ x: 2, y: 0 }}
          scale={3}
          updateDoorStatus={this.updateDoorStatus}
        />
        <Door
          doorStatus={this.state.doorStatus}
          id={0}
          position={{ x: 1010, y: 528 }}
          updateCurrentDoorFrame={this.updateCurrentDoorFrame}
        />
        {this.state.walkers.map(walker => (
          <Walker
            isWalking={walker.isWalking}
            key={walker.id}
            position={walker.position}
            speed={walker.speed}
            updateCanOpenStatus={this.updateCanOpenStatus}
            currentDoorFrame={this.state.currentDoorFrame}
            currentDoorInputEvent={this.state.currentDoorInputEvent}
          />
        ))}
        <Foreground
          position={{ x: 2, y: 0 }}
          scale={3}
        />
        <FPSCounter
          color={'white'}
          fps={this.state.fps}
          position={{ x: 10, y: 10 }}
          scale={1}
        />
        <Information
          color={'white'}
          information={this.state.information}
          position={{ x: 10, y: 586 }}
          scale={1}
        />
      </div>
    );
  }
}

export default Prototype02;
