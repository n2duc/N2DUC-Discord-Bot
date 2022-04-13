module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Độ delay của bot',
    aliases: ['ping', 'p'],
    description: 'Xem độ trễ của bot',
    run: async(client, message, args) => {
        message.channel.send(`🚀 Pong \`${client.ws.ping} ms\``)
    }
}