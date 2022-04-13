const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bal',
    aliases: ['bal', 'cash'],
    description: 'Xem số tiền của mình đang hiện có.',
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        const bal = await client.bal(message.member.id);
        const embed = new MessageEmbed()
            .setTitle('Tiền của bạn:')
            .setColor('GREEN')
            .setDescription(`\**${member.displayName}\** đang có **${bal}** <:PHCoin:933742687125921882>`)

        message.channel.send({ embeds: [embed] });
    }
}