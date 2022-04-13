const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rmv',
    description: 'Xóa số tiền của bạn.',
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        client.rmv(member.id, parseInt(args[0]));
        message.channel.send(`Đã xóa \**${args}\** <:PHCoin:933742687125921882> của \**${member.displayName}\**`)
    }
}