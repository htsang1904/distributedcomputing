'use strict';

/**
 * verifycode router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::verifycode.verifycode');
