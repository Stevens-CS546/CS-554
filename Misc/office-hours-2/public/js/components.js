"use strict";

var Playlist = function Playlist(_ref) {
  var songs = _ref.songs,
      title = _ref.title,
      description = _ref.description,
      id = _ref.id;

  var songItems = songs.map(function (x) {
    return React.createElement(
      "li",
      null,
      x.song,
      " by ",
      x.artist
    );
  });

  return React.createElement(
    "div",
    { className: "panel panel-default" },
    React.createElement(
      "div",
      { className: "panel-heading" },
      React.createElement(
        "h5",
        null,
        "#",
        id,
        " ",
        title
      )
    ),
    React.createElement(
      "div",
      { className: "panel-body" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          description
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-8" },
            React.createElement(
              "ol",
              null,
              songItems
            )
          )
        )
      )
    )
  );
};
"use strict";

var Playlists = function Playlists(_ref) {
  var playlists = _ref.playlists;

  return React.createElement(
    "div",
    null,
    playlists.map(function (playlist) {
      return React.createElement(Playlist, {
        key: playlist.id,
        title: playlist.title,
        description: playlist.description,
        id: playlist.id,
        songs: playlist.songs
      });
    })
  );
};
"use strict";

var AppComponent = function AppComponent() {
  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "col-sm-8" },
      React.createElement(PlaylistPageContainer, { url: "/playlists" })
    )
  );
};
"use strict";

var PlaylistForm = function PlaylistForm(_ref) {
  var handleChange = _ref.handleChange,
      title = _ref.title,
      description = _ref.description,
      songs = _ref.songs,
      newArtist = _ref.newArtist,
      newSong = _ref.newSong,
      addSong = _ref.addSong,
      _onSubmit = _ref.onSubmit,
      error = _ref.error;

  return React.createElement(
    "div",
    { className: "panel panel-default" },
    React.createElement(
      "div",
      { className: "panel-heading" },
      React.createElement(
        "h5",
        null,
        title
      )
    ),
    React.createElement(
      "div",
      { className: "panel-body" },
      React.createElement(
        "form",
        {
          onSubmit: function onSubmit(e) {
            e.preventDefault();
            _onSubmit(title, description, songs);
          }
        },
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            { htmlFor: "title" },
            "Playlist Title"
          ),
          React.createElement("input", {
            type: "text",
            className: "form-control",
            id: "title",
            name: "title",
            placeholder: "Playlist Title",
            value: title,
            onChange: handleChange
          })
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            { htmlFor: "description" },
            "Description"
          ),
          React.createElement("input", {
            type: "text",
            className: "form-control",
            id: "description",
            name: "description",
            placeholder: "Playlist Description",
            value: description,
            onChange: handleChange
          })
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            { htmlFor: "songs" },
            "Songs"
          ),
          React.createElement(
            "ol",
            null,
            songs.map(function (x) {
              return React.createElement(
                "li",
                null,
                x.song,
                " by ",
                x.artist
              );
            })
          )
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            { htmlFor: "description" },
            "New Artist"
          ),
          React.createElement("input", {
            type: "text",
            className: "form-control",
            id: "newArtist",
            name: "newArtist",
            placeholder: "New Artist",
            value: newArtist,
            onChange: handleChange
          })
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            { htmlFor: "description" },
            "New Song"
          ),
          React.createElement("input", {
            type: "text",
            className: "form-control",
            id: "newSong",
            name: "newSong",
            placeholder: "New Song",
            value: newSong,
            onChange: handleChange
          })
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "button",
            {
              type: "button",
              className: "btn btn-primary",
              onClick: function onClick(e) {
                e.preventDefault();
                addSong(newArtist, newSong);
              }
            },
            "Add Song"
          )
        ),
        error ? React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "div",
            { className: "alert alert-danger" },
            error
          )
        ) : null,
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "button",
            { type: "submit", className: "btn btn-primary" },
            "Add Playlist"
          )
        )
      )
    )
  );
};
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlaylistFormContainer = React.createClass({
  displayName: "PlaylistFormContainer",
  getInitialState: function getInitialState() {
    return {
      title: "New Title",
      description: "",
      songs: [],
      newArtist: "",
      newSong: "",
      error: ""
    };
  },
  handleChange: function handleChange(e) {
    e.preventDefault();
    this.setState(_defineProperty({}, e.target.name, e.target.value));
  },
  addSong: function addSong(artist, song) {
    if (!artist || !song) {
      this.setState({ error: "You must have a song and an artist" });
      return;
    }

    var newSong = { artist: artist, song: song };
    var songs = this.state.songs;

    this.setState({
      error: "",
      newSong: "",
      newArtist: "",
      songs: songs.concat(newSong)
    });
  },
  addPlaylist: function addPlaylist(title, description, songs) {
    var _this = this;

    if (!title || !description || songs.length === 0) {
      this.setState({
        error: "You must have a title, description, and some songs"
      });
    }

    var data = {
      playlist: {
        title: title,
        description: description,
        songs: songs
      }
    };

    return $.ajax({
      url: "/playlists",
      dataType: "json",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(data)
    }).then(function (newPlaylist) {
      _this.props.onPlaylistCreated(newPlaylist);

      _this.setState(_this.getInitialState());
    });
  },
  render: function render() {
    return React.createElement(PlaylistForm, _extends({}, this.state, {
      handleChange: this.handleChange,
      addSong: this.addSong,
      onSubmit: this.addPlaylist
    }));
  }
});
"use strict";

var PlaylistPageContainer = React.createClass({
  displayName: "PlaylistPageContainer",

  getInitialState: function getInitialState() {
    return { playlists: [] };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: function success(playlists) {
        _this.setState({ playlists: playlists });
      },
      error: function error(xhr, status, err) {
        console.error(_this.props.url, status, err.toString());
      }
    });
  },
  addPlaylist: function addPlaylist(playlist) {
    this.setState({ playlists: this.state.playlists.concat(playlist) });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "playlist" },
      React.createElement(Playlists, { playlists: this.state.playlists }),
      React.createElement("hr", null),
      React.createElement(PlaylistFormContainer, { onPlaylistCreated: this.addPlaylist })
    );
  }
});
'use strict';

ReactDOM.render(React.createElement(AppComponent, null), document.getElementById('content'));