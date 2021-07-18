const InvariantError = require('../../exceptions/InvariantError');
const { PostPlaylistSchema, PostSongToPlaylistSchema } = require('./schema');

const PlaylistsValidator = {
    validatePlaylistPayload: (payload) => {
        const validationResult = PostPlaylistSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        };
    },

    validatePostSongPlaylistPayload: (payload) => {
        const validationResult = PostSongToPlaylistSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        };
    },
};

module.exports = PlaylistsValidator;