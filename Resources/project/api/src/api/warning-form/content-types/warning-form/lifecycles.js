"use strict";
module.exports = {
    afterCreate: async (data) => {
        let TeleData = data.result
        let channelId = strapi.config.get('telegram.channelId')
        let date = new Date(TeleData.date)
        date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        let time = new Date(TeleData.time)
        time = time.toLocaleTimeString('vi-VN', { timeZone: 'Asia/Jakarta' })
        strapi.teleBot.sendMessage(
            channelId,
            `📞 Cửa hàng: <b>${TeleData.store_name}</b>\n
            Thời gian: <b>${time} ${date}</b>
            Số điện thoại: <b>${data.result.phone_number}</b>
            Nội dung: <b>${data.result.message || 'Không có'}</b>`,
            { parse_mode: 'HTML' }
        );
    }
}