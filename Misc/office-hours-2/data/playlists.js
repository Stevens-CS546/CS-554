const Promise = require("bluebird");

const playlists = [
  {
    id: 0,
    title: "Favorite Songs",
    description: `I put these jams on all the time`,
    songs: [
      { artist: "Frank Sinatra", song: "Fly Me To The Moon" },
      { artist: "Smashing Pumpkins", song: "1979" },
      { artist: "Selena Gomez", song: "Bad Liar" }
    ]
  },
  {
    id: 1,
    title: "Radio",
    description: "Catchy pop songs",
    songs: [
      { artist: "Steady, As She Goes", song: "The Raconteurs" },
      { artist: "Lady Gaga", song: "The Cure" },
      { artist: "Selena Gomez", song: "Bad Liar" },
      { artist: "Fitz and the Tantrums", song: "The Walker" },
      { artist: "Justin Timberlake", song: "Mirrors" }
    ]
  }
];

let exportedMethods = {
  getAllPlaylists() {
    return Promise.resolve(playlists);
  },
  addPlaylist(playlist) {
    playlist.id = playlists.length;
    playlists.push(playlist);
    return Promise.resolve(playlist);
  }
};

module.exports = exportedMethods;
