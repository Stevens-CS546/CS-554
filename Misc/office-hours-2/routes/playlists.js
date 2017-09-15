const express = require("express");
const router = express.Router();
const data = require("../data");
const playlistData = data.playlists;

router.get("/", (req, res) => {
  playlistData
    .getAllPlaylists()
    .then(playlists => {
      res.json(playlists);
    })
    .catch(() => {
      // Something went wrong with the server!
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  let newPlaylist = req.body.playlist;

  playlistData
    .addPlaylist(newPlaylist)
    .then(playlist => {
      res.json(playlist);
    })
    .catch(() => {
      // Something went wrong with the server!
      res.sendStatus(500);
    });
});

module.exports = router;
