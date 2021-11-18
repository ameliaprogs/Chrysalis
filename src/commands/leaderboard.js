const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "leaderboard",
  alias: ["lb","highscores","top","leaderboards"],
  admin: false,
  run: async (client, message, command, args, prefix, color, lang, modules) => {

  	let rank = modules.find((c) => c.name == 'rank');
    if (!rank.enabled) return;
    let embed = new MessageEmbed()
      .setTitle(lang.leaderboard_title)
      .setColor(color)
      .setThumbnail(await message.guild.iconURL());
    let description = `${lang.leaderboard_description}\n`;
    let highscores = rank.users.sort((a, b) => (a.xp < b.xp) ? 1 : -1);
    for (i of highscores.slice(0,10).keys()) {
      description+=`${getNumberEmoji(i+1)} ► <@!${highscores[i].id}>
                    ${lang.level}: \`${Math.trunc((Math.sqrt(5)/5)*Math.sqrt(highscores[i].xp))}\`
                    XP: \`${highscores[i].xp}\`\n`;
    }
    embed.setDescription(description);
    if (message.author) message.channel.send({embeds:[embed]});
    else message.editReply({embeds:[embed]});
  }
}

function getNumberEmoji(n) {
  switch (n) {
    case 1:
    return ':one:'
    case 2:
    return ':two:'
    case 3:
    return ':three:'
    case 4:
    return ':four:'
    case 5:
    return ':five:'
    case 6:
    return ':six:'
    case 7:
    return ':seven:'
    case 8:
    return ':eight:'
    case 9:
    return ':nine:'
    case 10:
    return ':keycap_ten:'
  }
}
