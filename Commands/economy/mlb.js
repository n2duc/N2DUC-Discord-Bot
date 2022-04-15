const { Client, Message, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'mlb',
    run: async(client, message, args) => {
        const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.bal(id);
                console.log(`${member.user.tag} -> ${bal}`);
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                }) : null;
            })
        );
        const data = collection.sort((a, b) => b.bal - a.bal).first(10);
        let lb = await data.map((v, i) => {
            return `\`#${i+1}\`| ${client.users.cache.get(v.id).tag} - \**${v.bal}\** <:phmoney:964044114289127484>`;
        })
        const embed = new MessageEmbed()
            .setAuthor({ name: `Bảng xếp hạng PH Money - ${client.user.username}`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setColor('BLURPLE')
            .setDescription(lb.join("\n"))
            .setTimestamp()
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        message.channel.send({ embeds: [embed] })
    },
};
