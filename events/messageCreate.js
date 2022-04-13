require('dotenv').config();
const { Collection } = require('discord.js')
const ms = require('ms')


module.exports = (client, message) => {
        const Timeout = new Collection();
        if (message.author.bot) return;
        const prefix = process.env.PREFIX
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if (command) {
            if (command.timeout) {
                if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Bạn phải đợi thêm \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` để có thể sử dụng lệnh.`)
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.timeout)
        } else {
            command.run(client, message, args)
        }
    }

}