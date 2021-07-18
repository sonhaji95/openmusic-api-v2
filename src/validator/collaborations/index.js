const InvariantError = require('../../exceptions/InvariantError');
const { CollaborationPayloadSchema, DeleteCollaborationSchema } = require('./schema');

const CollaborationsValidator = {
    validateCollaborationPayload: (payload) => {
        const validationResult = CollaborationPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        };
    },

    validateDeleteCollaborationSchema: (payload) => {
        const validationResult = DeleteCollaborationSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        };
    },
};

module.exports = CollaborationsValidator;