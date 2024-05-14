"use strict";
const nodemailer = require("nodemailer")
const approvedMail = require('./approved_mail')
const rejectedMail = require('./rejected_mail')

module.exports = {
  afterCreate: async (data) => {
    let TeleData = data.result
    console.log(TeleData)
    let channelId = strapi.config.get('telegram.channelId')
    let date = new Date(TeleData.createdAt)
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    let time = new Date(TeleData.createdAt)
    time = time.toLocaleTimeString('vi-VN', {
      timeZone: 'Asia/Jakarta'
    })
    strapi.teleBot.sendMessage(
      channelId,
      `📞 Thời gian: <b>${time} ${date}</b>\n
            Tên tài xế: <b>${TeleData.name}</b>
            Ngày sinh: <b>${TeleData.birth}</b>
            Email: <b>${TeleData.email}</b>
            Số điện thoại: <b>${TeleData.phone_number}</b>`, {
        parse_mode: 'HTML'
      }
    );
  },
  // afterUpdate: async (data) => {
  //   let mailData = data.result
  //   let message = mailData.is_approve ? "Đã phê duyệt" : "Chờ phê duyệt"
  //   const transporter = nodemailer.createTransport({
  //     host: strapi.config.get("email.host"),
  //     port: strapi.config.get("email.port"),
  //     secure: true,
  //     auth: {
  //       user: strapi.config.get("email.auth_user"),
  //       pass: strapi.config.get("email.auth_pass"),
  //     },
  //   })
  //   if (!mailData.approved_status) {
  //     if(mailData.is_approve) {
  //       await transporter.sendMail({
  //         from: `'${strapi.config.get("email.mailName")}' <${strapi.config.get("email.senderEmail")}>`,
  //         to: mailData.email,
  //         subject: 'Công ty TNHH GutaVN',
  //         html: approvedMail
  //       })
  //     } else {
  //       await transporter.sendMail({
  //         from: `'${strapi.config.get("email.mailName")}' <${strapi.config.get("email.senderEmail")}>`,
  //         to: mailData.email,
  //         subject: 'Công ty TNHH GutaVN',
  //         html: rejectedMail(mailData.reject_reason)
  //       })
  //     }
  //   }
  // }
}
