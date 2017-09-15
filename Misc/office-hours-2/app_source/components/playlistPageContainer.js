const PlaylistPageContainer = React.createClass({
  getInitialState: function() {
    return { playlists: [] };
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: playlists => {
        this.setState({ playlists: playlists });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  addPlaylist: function(playlist) {
    this.setState({ playlists: this.state.playlists.concat(playlist) });
  },

  render: function() {
    return (
      <div className="playlist">
        <Playlists playlists={this.state.playlists} />
        <hr />
        <PlaylistFormContainer onPlaylistCreated={this.addPlaylist} />
      </div>
    );
  }
});
