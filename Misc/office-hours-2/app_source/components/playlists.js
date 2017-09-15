const Playlists = ({ playlists }) => {
  return (
    <div>
      {playlists.map(playlist => {
        return (
          <Playlist
            key={playlist.id}
            title={playlist.title}
            description={playlist.description}
            id={playlist.id}
            songs={playlist.songs}
          />
        );
      })}
    </div>
  );
};
