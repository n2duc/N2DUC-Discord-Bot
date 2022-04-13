const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    timeout: 10000 * 5,
    description: 'Làm việc để nhận tiền.',
    run: async(client, message, args) => {
        const jobs = ['chơi phò', 'đi làm', 'đi học', 'ăn trộm', 'nhận học bổng', 'sóc lọ', 'hiếp dâm gái', 'thẩm du', 'hít cỏ'];

        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 100) + 1;

        message.channel.send(`Bạn vừa \**${jobs[jobIndex]}\** và nhận \`${coins}\` <:PHCoin:933742687125921882>!`);
        client.bank(message.author.id, coins);
    }
}