'use strict';


/**
 * driver controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
const nodemailer = require("nodemailer")
const approvedMail = require('../content-types/driver/approved_mail')
const rejectedMail = require('../content-types/driver/rejected_mail')

module.exports = createCoreController('api::driver.driver', ({strapi}) => ({
    async driverRegister(ctx) {
        let uploadFiles = ctx.request.files
        let bodyData = ctx.request.body
        // check exits phone number
        // let checkExits = await strapi.db.query('api::driver.driver').findOne({
        //   where: {
        //     phone_number: bodyData.phone_number
        //   },
        // });
        // if (checkExits) {
        //     return {
        //         success: false,
        //         message: 'Phone number already exists'
        //     }
        // }

        let register = await strapi.entityService.create('api::driver.driver', {
            data: {
                name: bodyData.name,
                birth: bodyData.birth,
                phone_number: bodyData.phone_number,
                email: bodyData.email,
                app_provider: bodyData.app_provider,
                is_approve: false,
                approved_status: false,
            },
            files: {
                id_card: uploadFiles.id_card,
                app_screenshot: uploadFiles.app_screenshot
            }
        })

        return {
            success: true,
            register
        }
    },
    async getData(ctx) {
        let data = await strapi.entityService.findMany('api::driver.driver', {
            populate: '*',
        })
        return data
    },
    async approveDriver(ctx) {
        let bodyData = ctx.request.body
        let expireDate = new Date(bodyData.expire_at)
        const isoString = expireDate.toISOString();
        const formattedDate = isoString.split('T')[0].replace('-', '/').replace('-', '/') + ' ' + isoString.split('T')[1].slice(0, 8);
        console.log(formattedDate)
        const transporter = nodemailer.createTransport({
        host: strapi.config.get("email.host"),
        port: strapi.config.get("email.port"),
        secure: true,
        auth: {
            user: strapi.config.get("email.auth_user"),
            pass: strapi.config.get("email.auth_pass"),
        },
        })
  
        let update = await strapi.entityService.update('api::driver.driver', bodyData.id,{
            data: {
                is_approve: bodyData.is_approve,
                reject_reason: bodyData.reject_reason,
                expire_at: expireDate,
                approved_status: true,
            },
        }).then((res) => {
            if (!bodyData.approved_status) {
                if(bodyData.is_approve) {
                    transporter.sendMail({
                    from: `'${strapi.config.get("email.mailName")}' <${strapi.config.get("email.senderEmail")}>`,
                    to: bodyData.email,
                    subject: 'Công ty TNHH GutaVN',
                    html: approvedMail
                    })
                } else {
                    transporter.sendMail({
                    from: `'${strapi.config.get("email.mailName")}' <${strapi.config.get("email.senderEmail")}>`,
                    to: bodyData.email,
                    subject: 'Công ty TNHH GutaVN',
                    html: rejectedMail(bodyData.reject_reason)
                    })
                }
            }
        }).catch((err) => {
            console.log(err)
        })

        return {
            success: true,
            update
        }
    },
}));
