const telegramNode = require('node-telegram-bot-api');
let telegramBot;

const teleBot = {
    init(strapi) {
        console.log(strapi.config.get('telegram.enabled'))
        if (!strapi.config.get('telegram.enabled')) {
            console.warn('Telegram bot is disabled')
            return;
        }
        telegramBot = new telegramNode(strapi.config.get('telegram.botToken'), { polling: true });
        if (strapi.config.get('telegram.handleEnabled')) {
            let channelId = strapi.config.get('telegram.channelId')
            this.handleTeleMsg(channelId)
        }
        return telegramBot
    },
    handleTeleMsg: function (channelId) {
        telegramBot.on('message', (msg) => {
            console.log(msg)
        });
    },
    sendMessage: function (message, channelId, options = {}) {
        if (!channelId) {
            channelId = configs.telegramBot.channelId
        }
        telegramBot.sendMessage(channelId, message, options);
    },

}
module.exports = teleBot