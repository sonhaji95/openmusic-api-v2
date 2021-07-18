const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists',
        handler: handler.postPlaylistHandler,
        options: {
            auth: 'musicapps_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists',
        handler: handler.getPlaylistsHandler,
        options: {
            auth: 'musicapps_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{playlistId}',
        handler: handler.deletePlaylistByIdHandler,
        options: {
            auth: 'musicapps_jwt',
        },
    },
    {
        method: 'POST',
        path: '/playlists/{playlistId}/songs',
        handler: handler.postSongHandler,
        options: {
            auth: 'musicapps_id',
        },
    },
    {
        method: 'GET',
        path: '/playlist/{playlistId}/songs',
        handler: handler.getSongFromPlaylistHandler,
        options: {
            auth: 'musicapps_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{playlistId}/songs',
        handler: handler.deleteSongPlaylistByIdHandler,
        options: {
            auth: 'musicapps_jwt',
        },
    },
    {
        method: 'GET',
        path: '/users',
        handler: handler.getUserByUsernameHandler,
    }
];

module.exports = routes;