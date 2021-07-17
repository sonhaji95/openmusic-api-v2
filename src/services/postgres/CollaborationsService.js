const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const AuthorizationsError = require('../../exceptions/AuthorizationError');

class CollaborationsService {
    constructor() {
        this._pool = new Pool();
    }

    //Create user Collaborasi
    async addUserToCollaboration(playlistId, userId) {
        const id = `collab-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO collaborators VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, userId],
        };
        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('User kolaborasi gagal ditambahkan');
        };
        return result.rows[0].id;
    }

    //Delete User Calloborasi
    async deleteUserFromCollaboration(playlistId, userId) {
        const query = {
            text: 'DELETE FROM collaborators WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
            values: [playlistId, userId],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('User kolaborasi gagal dihapus');
        }
    }

    //Verivikasi Calloborasi
    async verifyCollaborator(playlistId, collaborator) {
        const query = {
            text: 'SELECT * FROM collaborators WHERE playlist_id = $1 AND user_id = $2',
            values: [playlistId, collaborator],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new AuthorizationsError('Anda tidak berhak mengakses resource ini.');
        }
    }
}

module.exports = CollaborationsService;