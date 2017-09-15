const PlaylistFormContainer = React.createClass({
  getInitialState() {
    return {
      title: "New Title",
      description: "",
      songs: [],
      newArtist: "",
      newSong: "",
      error: ""
    };
  },
  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  },
  addSong(artist, song) {
    if (!artist || !song) {
      this.setState({ error: "You must have a song and an artist" });
      return;
    }

    const newSong = { artist, song };
    const { songs } = this.state;
    this.setState({
      error: "",
      newSong: "",
      newArtist: "",
      songs: songs.concat(newSong)
    });
  },
  addPlaylist(title, description, songs) {
    if (!title || !description || songs.length === 0) {
      this.setState({
        error: "You must have a title, description, and some songs"
      });
    }

    const data = {
      playlist: {
        title,
        description,
        songs
      }
    };

    return $.ajax({
      url: "/playlists",
      dataType: "json",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(data)
    }).then(newPlaylist => {
      this.props.onPlaylistCreated(newPlaylist);

      this.setState(this.getInitialState());
    });
  },
  render() {
    return (
      <PlaylistForm
        {...this.state}
        handleChange={this.handleChange}
        addSong={this.addSong}
        onSubmit={this.addPlaylist}
      />
    );
  }
});
