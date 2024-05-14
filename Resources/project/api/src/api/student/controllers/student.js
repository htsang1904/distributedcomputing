'use strict';

/**
 * student controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
const { sendEmailVerification } = require('../../../helpers/sendMail');
module.exports = createCoreController('api::student.student', ({strapi}) => ({
    async studentRegister(ctx) {
        let uploadFiles = ctx.request.files
        let bodyData = ctx.request.body
        let checkExits = await strapi.entityService.findMany('api::student.student', {
            filters: {
                $or: [
                  {
                    phone_number: bodyData.phone_number,
                  },
                  {
                    email: bodyData.email,
                  },
                ],
              },
        })
        if (checkExits.length !== 0) {
            return {
                success: false,
                message: 'User already exists'
            }
        }
        let now = new Date()
        let emailToken = Date.parse(now) + this.makeid(15)
        let link = `http://localhost:8080/#/verification?code=${emailToken}`
        let sendMail = sendEmailVerification(bodyData.email, link)
        let register = await strapi.entityService.create('api::student.student', {
            data: {
                name: bodyData.name,
                birth: bodyData.birth,
                phone_number: bodyData.phone_number,
                email: bodyData.email,
                token: emailToken,
                is_email_verify: false
            },
            files: {
                id_card: uploadFiles.id_card,
                student_card: uploadFiles.student_card
            },
        })
        return {
            success: true,
            register
        }
    },

    async verifyEmailCode(ctx) {
        let code = ctx.request.body.code
        let checkStudent = await strapi.entityService.findMany('api::student.student', {
            filters: {
               token: code
              },
        })
        if(checkStudent[0].is_email_verify) {
            return {message: 'Emai has been verified'}
        }else {
            let verify = strapi.entityService.update('api::student.student', checkStudent[0].id, {
                data: {
                    is_email_verify: true,
                }
            })
            return verify
        }
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
    }
}));