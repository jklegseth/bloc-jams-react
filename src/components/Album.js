import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import SongRow from './SongRow';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentSongIndex: 0,
      currentTime: 0,
      currentVolume: .7,
      duration: album.songs[0].duration,
      isPlaying: false,
      isPaused: false,
      isMuted: false,
      premuteVolume: .7
    }

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    // need to do this here to be able to use `removeEventListener`
    this.onTimeupdate = this.onTimeupdate.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.onEnded = this.onEnded.bind(this);
  }

  play(song) {
    this.audioElement.play();
    this.setState({
      isPlaying: true,
      isPaused: false
    });
  }

  pause(song) {
    this.audioElement.pause();
    this.setState({
      isPlaying: false,
      isPaused: true
    });
  }

  toggleMute() {
    console.log(this.state.isMuted);
    if (this.state.isMuted) {
      this.setState({
        currentVolume: this.state.premuteVolume,
        isMuted: false
      });
      this.audioElement.volume = this.state.premuteVolume;
    } else {
      this.setState({
        premuteVolume: this.state.currentVolume,
        currentVolume: 0,
        isMuted: true
      });
      this.audioElement.volume = 0;
    }
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    const currentIndex = this.state.album.songs.findIndex(item => song === item);
    this.setState({
      currentSong: song,
      currentSongIndex: currentIndex
    });
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

  onTimeupdate() {
    this.setState({ currentTime: this.audioElement.currentTime });
  }

  onDurationChange() {
    this.setState({ duration: this.audioElement.duration });
  }

  onVolumeChange() {
    this.setState({ currentVolume: this.audioElement.volume });
  }

  onEnded() {
    this.handleNextClick();
  }

  componentDidMount() {
    this.audioElement.addEventListener('timeupdate', this.onTimeupdate);
    this.audioElement.addEventListener('durationchange', this.onDurationChange);
    this.audioElement.addEventListener('volumechange', this.onVolumeChange);
    this.audioElement.addEventListener('ended', this.onEnded);
  }

  componentWillUnmount() {
    this.audioElement.removeEventListener('timeupdate', this.onTimeupdate);
    this.audioElement.removeEventListener('durationchange', this.onDurationChange);
    this.audioElement.removeEventListener('volumechange', this.onVolumeChange);
    this.audioElement.removeEventListener('ended', this.onEnded);
    this.pause();
  }

  render() {
    return (
      <div className="album">
        <section className="container narrow">
          <div className="clearfix">
            <div className="column half">
              <img src={ this.state.album.albumCover } className="album-cover" alt={this.state.album.title} />
            </div>
            <div className="album-details column half">
              <h2 className="album-title" id="album-title">{ this.state.album.title }</h2>
              <h3 className="album-artist">{ this.state.album.artist }</h3>
              <h5 className="album-release-info" id="release-info">{ this.state.album.releaseInfo }</h5>
            </div>
          </div>
        </section>
        <div className="album-song-list-container">
          <table className="album-song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
            {
              this.state.album.songs.map((song, index) => {
                return <SongRow
                  song={ song }
                  key={ index }
                  index={ index }
                  isPlaying={ this.state.isPlaying }
                  isPaused={ this.state.isPaused }
                  isSelectedSong={ index === this.state.currentSongIndex }
                  handleSongClick={ () => this.handleSongClick(song) }
                />
              })
            }
            </tbody>
          </table>
          <PlayerBar
            isPlaying={ this.state.isPlaying }
            currentSong={ this.state.currentSong }
            currentTime={ this.audioElement.currentTime }
            currentVolume={ this.state.currentVolume }
            duration={ this.audioElement.duration }
            isMuted={ this.state.isMuted }
            handleSongClick={ () => this.handleSongClick(this.state.currentSong) }
            handlePrevClick={ () => this.handlePrevClick() }
            handleNextClick={ () => this.handleNextClick() }
            handleTimeChange={ (e) => this.handleTimeChange(e) }
            handleVolumeChange={ (e) => this.handleVolumeChange(e) }
            formatTime={ (seconds) => this.formatTime(seconds) }
            toggleMute={ () => this.toggleMute() }
          />
        </div>
      </div>
    );
  }
}

export default Album;
