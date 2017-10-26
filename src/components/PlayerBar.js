import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <div className="container">
          <div className="main-controls">
            <button id="previous" onClick={ this.props.handlePrevClick }>
              <span className="ion-skip-backward"></span>
            </button>
            <button className="player-bar-play-pause" id="play-pause" onClick={ this.props.handleSongClick }>
              <span className={ this.props.isPlaying ? 'ion-pause' : 'ion-play' }></span>
            </button>
            <button id="next" onClick={ this.props.handleNextClick }>
              <span className="ion-skip-forward"></span>
            </button>
          </div>
        </div>

        <div className="playerbar-seekbars">
          <div className="seek-control">
            <input
              type="range"
              className="seek-bar"
              value={ (this.props.currentTime / this.props.duration) || 0 }
              max="1"
              min="0"
              step="0.01"
              onChange={ this.props.handleTimeChange }
            />
            <div className="current-time">{ this.props.formatTime(this.props.currentTime) }</div>
            <div className="total-time">{ this.props.formatTime(this.props.duration) }</div>
          </div>
          <div className="volume">
            <span className={ this.props.isMuted ? 'icon ion-volume-mute' : 'icon ion-volume-high' } onClick={ this.props.toggleMute }></span>
            <input
              type="range"
              className="seek-bar"
              value={ this.props.currentVolume }
              max="1"
              min="0"
              step=".1"
              onChange={ this.props.handleVolumeChange }
            />
          </div>
        </div>
      </section>
    );
  }
}

export default PlayerBar;
