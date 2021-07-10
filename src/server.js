//impor dotenv dan configurasi
require('dotenv').config();

const Hapi = require('@hapi/hapi');
//songs
const songs = require('./api/songs');
const SongsValidator = require('./validator/songs');
const SongsService = require('./services/postgres/SongsService');
const ClientError = require('./exceptions/ClientError');

//users
const user = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');
const users = require('./api/users');

const init = async () => {
    const songsService = new SongsService();
    const usersService = new UsersService();
    
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    
    /* membuat extentions function untuk life cyle onPreResponse */
    server.ext('onPreResponse', (request, h) => {
        //mendapatkan konteks response dari request
        const { response } = request;

        if (response instanceof ClientError) {
            //membuat response baru dari response toolkit sesuai kebutuhan error handling
            const newResponse = h.response({
                status: 'fail',
                message: response.message,
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        /*jika bukan ClientError, lanjutkan dgn response sebelumnya (tanpa terintervensi)*/
        return response.continue || response;
    });

    await server.register([
        {
            plugin: songs,
            options: {
            service: songsService,
            validator: SongsValidator,
            }
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            }
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();