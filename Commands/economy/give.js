const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'give',
    usage: '<số tiền> <Tag người nhận>',
    description: 'Chuyển tiền cho người khác.',
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
        if (!user) return message.reply('Vui lòng tag ai đó!')

        const coinsToGive = args[1];
        if (!coinsToGive) return message.reply('Vui lòng nhập số tiền để gửi');

        if (isNaN(coinsToGive))
            return message.reply('Tiền bằng số')

        const convertedGive = parseInt(coinsToGive);
        if (await client.bal(message.author.id) < convertedGive) return message.reply('Bạn không đủ tiền')

        await client.rmv(message.author.id, convertedGive);
        await client.bank(user.id, convertedGive);
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`✅\**${message.author}\** vửa gửi \**${convertedGive}\** <:PHCoin:933742687125921882> cho ${user}`)
            .setTimestamp()
            .setFooter({ text: `PentHouse` })
        message.channel.send({ embeds: [embed] });
    }
}