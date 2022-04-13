const { getAudioUrl } = require('google-tts-api')

module.exports = {
    name: 'speak',
    description: 'Nói chuyện bằng bàn phím',
    category: 'fun',
    aliases: ['speak', 's'],
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Phải nhập cái mẹ gì vào chứ ?');
        const string = args.join(' ');
        if (string.length > 1000) return message.channel.send('Dưới 1000 từ hộ bố mày cái !');
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Vào room voice mới dùng được chứ địt mẹ ? ');
        const audioUrl = await getAudioUrl(string, {
            lang: 'vi',
            slow: false,
            host: 'https:/translate.google.com',
        });
        try {
            voiceChannel.join(' ').then(connection => {
                const dispatcher = connection.play(audioUrl);
                dispatcher.on('finish', () => {
                    voiceChannel.leave();
                });
            });
        } catch (e) {
            message.channel.send('Bot lỗi mẹ rồi, thử lại đê');
            console.error(e);
        };
    },
}