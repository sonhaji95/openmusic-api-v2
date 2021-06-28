/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('songs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        year: {
            type: 'NUMERIC',
            notNull: true,
        },
        performer: {
            type: 'TEXT',
            notNull: true,
        },
        genre: {
            type: 'TEXT',
            notNull: true,
        },
        duration: {
            type: 'NUMERIC',
            notNull: true,
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        update_at: {
            type: 'TEXT',
            notNull: true,
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('songs');
};
