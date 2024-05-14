'use strict';

/**
 * verifycode service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::verifycode.verifycode');
