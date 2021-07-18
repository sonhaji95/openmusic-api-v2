const ClientError = require('../../exceptions/ClientError');

class CollaborationsHandler {
    constructor(collaborationsService, playlistsService, validator) {
        this._collaborationsService = collaborationsService;
        this._playlistsService = playlistsService;
        this._validator = validator;

        //binding
        this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
        this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
    }

    //post collaboration
    async postCollaborationHandler(request, h) {
        try {
            this._validator.validateCallobortionPayload(request.payload);
            const { playlistId, userId } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
            const collaborationId = await this._collaborationsService.addUserToCollaboration(playlistId, userId);
            const response = h.response({
                status: 'success',
                message: 'User kolaborasi berhasil ditambahkan',
                data: {
                    collaborationId,
                },
            });
            response.code(201);
            return response;

        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            };

            //SERVER ERROR
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    //delete collaboration
    async deleteCollaborationHandler(request, h) {
        try {
            this._validator.validateCollaborationPayload(request.payload);
            const { playlistId, userId } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
            await this._collaborationsService.deleteUserFromCollaboration(playlistId, userId);
            return {
                status: 'success',
                message: 'User kolaborasi berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            };

            //SERVER ERROR
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = CollaborationsHandler;