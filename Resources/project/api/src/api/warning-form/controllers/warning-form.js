'use strict';

/**
 * warning-form controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::warning-form.warning-form', ({ strapi }) => ({

    async submitForm(ctx) {
        let bodyData = ctx.request.body
        let register = await strapi.entityService.create('api::warning-form.warning-form', {
            data: {
                store_name: bodyData.store_name,
                date: bodyData.date,
                time: bodyData.time,
                phone_number: bodyData.phone_number,
                message: bodyData.message
            },
        })
        return {
            success: true,
            register
        }
    },
}));
