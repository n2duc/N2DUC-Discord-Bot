const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'daily',
    timeout: 50000,
    description: 'Nhận tiền trợ cấp hằng ngày.',
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 200) + 1;

        message.channel.send(`Bạn vừa nhận \`${coins}\` PHcoin trong ngày hôm nay!`);
        client.bank(message.author.id, coins);
    }
}