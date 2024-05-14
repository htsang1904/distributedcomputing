'use strict';

/**
 * verifycode controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::verifycode.verifycode', ({strapi}) => ({
    async mailVerification() {
        let code = this.makeid(10)
        let createCode = await strapi.entityService.create('api::verifycode.verifycode', {
            data: {
                code: code,
            }
        })
        return createCode
    },
    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    },
}));
