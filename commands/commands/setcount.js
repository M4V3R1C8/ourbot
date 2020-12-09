const { MessageEmbed } = require( "discord.js" );
const moment = require('moment');
const tz = require('moment-timezone');
module.exports = {
  name: "setcount",
  aliases: [ "" ],
  description: "Setup a member counter for your discord.",
  usage: "<#>",
  run: async ( bot, message, args, db ) => {
    let memCountID = args[0];
    let guildMemberCount = message.guild.memberCount;
    db.collection('guilds').doc(message.guild.id).update({
      'memcountID': memCountID,
      'guildMemberCount': guildMemberCount,
    }).then(() => {
      var memChannelID = bot.channels.cache.get(memCountID);
      memChannelID.edit({ name: `Members: ${guildMemberCount}` }, 'Member update').catch(console.error);
    });
  }
}