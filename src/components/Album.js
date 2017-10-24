import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      currentVolume: .7,
      duration: album.songs[0].duration,
      isPlaying: false
    }

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play(song) {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause(song) {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause(song);
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play(song);
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds - minutes * 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // avoid flashing `NaN:NaN`
    if (Number.isNaN(minutes) || Number.isNaN(seconds)) return;

    return `${minutes}:${seconds}`;
  }

  componentDidMount() {
    this.audioElement.addEventListener('timeupdate', e => {
      this.setState({ currentTime: this.audioElement.currentTime })
    });

    this.audioElement.addEventListener('durationchange', e => {
      this.setState({ duration: this.audioElement.duration })
    });

    this.audioElement.addEventListener('volumechange', e => {
      this.setState({ currentVolume: this.audioElement.volume })
    });
  }

  render() {
    return (
      <div>
        <section id="album-info">
          <img id="album-cover-art" src={ this.state.album.albumCover } alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{ this.state.album.title }</h1>
            <h2 className="artist">{ this.state.album.artist }</h2>
            <div id="release-info">{ this.state.album.releaseInfo }</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map((song, index) =>
              <tr className="song" key={ index } onClick={() => this.handleSongClick(song)}>
                <td className="song-actions">
                  <span className="song-number">{index+1}</span>
                  <span className="ion-play"></span>
                  <span className="ion-pause"></span>
                </td>
                <td className="song-item-title">{ song.title }</td>
                <td className="song-item-duration">{ this.formatTime(song.duration) }</td>
              </tr>
            )
          }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={ this.state.isPlaying }
          currentSong={ this.state.currentSong }
          currentTime={ this.audioElement.currentTime }
          currentVolume={ this.state.currentVolume }
          duration={ this.audioElement.duration }
          handleSongClick={ () => this.handleSongClick(this.state.currentSong) }
          handlePrevClick={ () => this.handlePrevClick() }
          handleNextClick={ () => this.handleNextClick() }
          handleTimeChange={ (e) => this.handleTimeChange(e) }
          handleVolumeChange={ (e) => this.handleVolumeChange(e) }
          formatTime={ (seconds) => this.formatTime(seconds) }
        />
      </div>
    );
  }
}

export default Album;