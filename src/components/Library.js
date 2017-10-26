import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData }
  }

  render() {
    return (
      <section className="library">
        {
          this.state.albums.map((album, index) =>
            <Link key={index} to={`/album/${album.slug}`} className="library-album">
              <div className="library-image">
                <img src= { album.albumCover } alt={ album.title } className="library-album-cover" />
              </div>
              <div className="library-album-info">
                <p className="library-album-name">
                  { album.title }
                </p>
                <p className="library-album-artist">
                  { album.artist }
                </p>
                <p className="library-album-songs">
                  { album.songs.length } songs
                </p>
              </div>
            </Link>
          )
        }
      </section>
    )
  }
}

export default Library;
