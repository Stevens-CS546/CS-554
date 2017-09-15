const PlaylistForm = ({
  handleChange,
  title,
  description,
  songs,
  newArtist,
  newSong,
  addSong,
  onSubmit,
  error
}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading"><h5>{title}</h5></div>
      <div className="panel-body">
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(title, description, songs);
          }}
        >
          <div className="form-group">
            <label htmlFor="title">Playlist Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Playlist Title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Playlist Description"
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="songs">Songs</label>
            <ol>
              {songs.map(x => <li>{x.song} by {x.artist}</li>)}
            </ol>
          </div>

          <div className="form-group">
            <label htmlFor="description">New Artist</label>
            <input
              type="text"
              className="form-control"
              id="newArtist"
              name="newArtist"
              placeholder="New Artist"
              value={newArtist}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">New Song</label>
            <input
              type="text"
              className="form-control"
              id="newSong"
              name="newSong"
              placeholder="New Song"
              value={newSong}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={e => {
                e.preventDefault();
                addSong(newArtist, newSong);
              }}
            >
              Add Song
            </button>
          </div>

          {error
            ? <div className="form-group">
                <div className="alert alert-danger">{error}</div>
              </div>
            : null}

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Add Playlist
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
