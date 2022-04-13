const Discord = require('discord.js');


const client = new Discord.Client({
    intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_WEBHOOKS'],
    partials: ['CHANNEL', 'MESSAGE'],
    allowedMentions: ["users"]
});

require('dotenv').config();
const TOKEN = process.env.TOKEN

const mongo = require('mongoose')
const schema = require('./schema')

mongo.connect(process.env.MONGODB_SRV, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

client.snipes = new Map();
client.on('messageDelete', async function(message, channel) {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

client.esnipes = new Discord.Collection();
client.on('messageUpdate', async(oldMes, newMes) => {
    const esnipes = client.esnipes.get(oldMes.channel.id) || [];
    if (esnipes.length > 5) esnipes == esnipes.slice(0, 4)
    esnipes.unshift({
        msg: oldMes,
        newc: newMes,
        author: oldMes.author
    })
    client.esnipes.set(oldMes.channel.id, esnipes)
})

client.on('messageCreate', message => {
    if (message.content.toLowerCase() == 'vica') {
        message.react('🐰')
        message.react('🐟')
    }
})
client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if (!data) return ful(0);
    ful(data.coins);
})
client.bank = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if (err) throw err;
        if (data) {
            data.coins += coins;
        } else {
            data = new schema({ id, coins })
        }
        data.save();
    })
}
client.rmv = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if (err) throw err;
        if (data) {
            data.coins -= coins;
        } else {
            data = new schema({ id, coins: -coins })
        }
        data.save();
    })
}


client.login(TOKEN);