module.exports = (client) => {
    console.log(`Bot is ready! ${client.user.tag}`);
    client.user.setPresence({
        activities: [{
            name: 'Phò',
            type: 'PLAYING'
        }],
        status: 'online'
    });
}