import React, { Component } from 'react';
import Prototype from './Game/Prototype01';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.loader = window.PIXI.loader;
    this.loader.add('scott_pilgrim_spritesheet_walking_01', 'assets/sprites/scott_pilgrim_spritesheet_walking_01.json');
    this.loader.load();
    this.state = {
      isLoadComplete: false,
    }
  }

  componentDidMount() {
    this.loader.onComplete.add(() => {
      this.setState({
        isLoadComplete: true,
      });
    });
  }

  render() {
    if (!this.state.isLoadComplete) {
      return null;
    }
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-header__title">HOLD THE DOOR</h1>
          <p className="App-header__subtitle"><em>Order your employees to hold the door for each other!</em></p>
        </div>
        <Prototype />
      </div>
    );
  }
}

export default App;
