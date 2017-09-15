const Playlist = ({ songs, title, description, id }) => {
  const songItems = songs.map(x => <li>{x.song} by {x.artist}</li>);

  return (
    <div className="panel panel-default">
      <div className="panel-heading"><h5>#{id} {title}</h5></div>
      <div className="panel-body">
        <div>
          <p>
            {description}
          </p>
          <div className="row">
            <div className="col-md-8">
              <ol>
                {songItems}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
