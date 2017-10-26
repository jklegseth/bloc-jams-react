## Shadow Play

A simple music player (faux) website with only React (no Redux, etc).

![](https://www.dropbox.com/s/dalcvimsvcrik77/Screenshot%202017-10-26%2009.22.34.png?raw=1)

What's kinda cool:
- play music from album song list
- play/pause
- next/previous
- autoplay next song
- location and volume seekbars update constantly, can click or drag to new location
- mute/unmute
- pulls music from AWS

Not so great:
- only three albums
- no dynamic loading of albums
- if autoplaying and the current song is below the viewport it stays there
- home page content is pretty useless (the vibe and image is cool, though)

Wishlist:
- by far the most desirable would be loading albums and songs dynamically to expand the collection and stop requiring audio files stored with the app, but as this is mostly a proof-of-concept (not to mention we hardly need another music player). While this isn't intended to be _real_ app it would be a useful exercise to store album data in Firebase.
- a more useful home page, or remove content and make it more of a splash page

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and based on [Bloc's _Intro to React_ project](bloc.io).
