const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'esnipe',
    description: 'Xem lại tin nhắn vừa bị chỉnh sửa.',
    category: 'fun',
    aliases: ['esnipe', 'e'],
    run: async(client, message, args) => {
        const esnipes = client.esnipes.get(message.channel.id)
        if (!esnipes) return message.channel.send({ content: 'Không có tin nhắn nào vừa được chỉnh sửa.' })

        const esnipe = +args[0] - 1 || 0
        const target = esnipes[esnipe]
        if (!target) {
            message.reply(`Có ${snipes.length} để snipe.`)
        }
        const { newc, msg } = target
        const embed = new MessageEmbed()
            .setAuthor({ name: `Người gửi:${msg.author.tag}`, iconURL: msg.author.avatarURL({ dynamic: true }) })
            .setColor('GREEN')
            .addField('Tin nhắn cũ:', msg.content)
            .addField('Tin nhắn mới:', newc.content)
            .setTimestamp()
            .setFooter({ text: message.guild.name })
        if (esnipes.image) embed.setImage(esnipes.image)
        message.react('🚀')
        message.channel.send({ embeds: [embed] });
    }
}