import React from 'react';

const Landing = () => (
  <div>
    <section className="hero-content">
        <h1 className="hero-title">Turn the music up!</h1>
      </section>

    <section className="selling-points">
      <div className="point">
        <span className="ion-music-note"></span>
        <h2 className="point-title">Choose your music</h2>
        <p className="point-description">Why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <span className="ion-radio-waves"></span>
        <h2 className="point-title">Unlimited, streaming, ad-free</h2>
        <p className="point-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <span className="ion-iphone"></span>
        <h2 className="point-title">Mobile enabled</h2>
        <p className="point-description">Listen to your music on the go, on any device.</p>
      </div>
    </section>
  </div>
);

export default Landing;
