const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bank',

    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        client.bank(member.id, parseInt(args[0]));
        message.channel.send('Đã thêm tiền')
    }
}