const { MessageEmbed } = require('discord.js')
const weather = require('weather-js')

module.exports = {
    name: 'weather',
    category: 'info',
    description: 'Xem thời tiết khu vực bạn ở',
    aliases: ['weather', 'wt'],
    run: async(client, message, args) => {
        let city = args.join(" ");
        if (!city) {
            return message.channel.send("Vui lòng điền nơi bạn muốn xem thời tiết !");
        }

        weather.find({ search: city, degreeType: "C" }, (error, result) => {
            if (error) return message.channel.send("Đã có lỗi xảy ra !");
            else if (result.length === 0) {
                return message.channel.send("Không tìm thấy thành phố của bạn !");
            }

            let current = result[0].current;
            let location = result[0].location
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor({ name: `Thời tiết ở ${current.observationpoint} ngày hôm nay`, iconURL: current.imageUrl })
                .setThumbnail(current.imageUrl)
                .setDescription(`**${current.skytext}**`)
                .addField('Múi giờ', `UTC ${location.timezone}`, true)
                .addField('Nhiệt độ:', `${current.temperature}°C`, true)
                .addField('Gió:', `${current.winddisplay}`, true)
                .addField('Feels Like:', `${current.feelslike}°C`, true)
                .addField('Độ ẩm:', `${current.humidity}%`, true)
                .addField('Người yêu:', 'Đéo có', true)
                .setTimestamp()
                .setFooter({ text: 'PentHouse' })
            message.channel.send({ embeds: [embed] });
        })
    }
}