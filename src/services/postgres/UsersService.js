const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
    constructor() {
        this._pool = new Pool();
    }

    //fungsi add user
    async addUser({ username, password, fullname }) {
        await this.verifyNewUsername(username);

        const id = `user-${nanoid(16)}`;
        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, username, fullname, hashedPassword],
        };
        //console.log(query.values);

        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('User gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    //verivikasi user baru
    async verifyNewUsername(username) {
        const query = {
            text: 'SELECT username FROM users WHERE  username = $1 ',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (result.rowCount > 0) {
            throw new InvariantError('Gagal menambahkan user. Username sudah digunakan');
        };
    }

    //fungsi get user by id
    async getUserById(userId) {
        const query = {
            text: 'SELECT id, username, fullname FROM users WHERE id = $1',
            values: [userId],
        };

        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('User tidak ditemukan');       
        };
        return result.rows[0];
    }

    //verivikasi kredensial user
    async verifyUserCredential(username, password) {
        const query = {
            text: 'SELECT id, password FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new AuthenticationError('Kredensial yang anda berikan salah');
        };

        const { id, password: hashedPassword} = result.rows[0];

        //Komparasi hashedPassword 
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new AuthenticationError('Kredensial yang Anda berikan salah');
        };
        
        return id;
    }
}

module.exports = UsersService;