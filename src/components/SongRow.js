import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SongRow extends Component {
  constructor(props) {
    super(props);

    this.state = {  hover: false }
  }

  onHover() {
    this.setState({ hover: true });
  }

  offHover() {
    this.setState({ hover: false });
  }

  render() {
    let selectedAndPlaying = this.props.isSelectedSong && this.props.isPlaying;
    let selectedAndPaused = this.props.isSelectedSong && this.props.isPaused;
    let playPauseClass = selectedAndPlaying ? (this.state.hover ? 'ion-pause' : 'icon-eq') : 'ion-play';
    let isPlaying = selectedAndPlaying || selectedAndPaused;

    return (
      <tr
        className={"song" + (isPlaying ? ' playing' : '')}
        key={ this.props.index }
        onMouseEnter={ this.onHover.bind(this) }
        onMouseLeave={ this.offHover.bind(this) }
      >
        <td className={"song-number" + (isPlaying ? ' playing' : '')} onClick={ () => this.props.handleSongClick(this.props.song) }>
          <a className="song-play-pause">
            <span className={isPlaying || this.state.hover ? playPauseClass : ''}>
                { !isPlaying && !this.state.hover ? this.props.index + 1 : '' }
            </span>
          </a>
        </td>
        <td className="song-title">{ this.props.song.title }</td>
        <td className="song-duration">{ this.props.song.duration }</td>
      </tr>
    )
  }
}

SongRow.propTypes = {
  isSelectedSong: PropTypes.bool.isRequired,
  song: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  handleSongClick: PropTypes.func.isRequired,
}


export default SongRow;
