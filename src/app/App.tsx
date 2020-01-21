import React from 'react';
import './App.css';
import Game from '../features/game/Game';
import Scoreboard from "../features/scoreboard/Scoreboard";

const App = () => {
    return (
      <div className="container">
          <div className="row">
              <div className="column column-50 column-offset-25">
                  <Scoreboard/>
                  <Game/>
              </div>
          </div>
      </div>
  );
};

export default App;
