const Discord = require( 'discord.js' );
module.exports = {
  name: "cap",
  aliases: [ "acp" ],
  description: "Returns the correct image and text for Scourge of the Past damage phase",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `CAP DPS for Insurection Prime!` )
      .setThumbnail( 'https://cdn.discordapp.com/attachments/699036998660259864/703768913413931148/coomer2.jpg' )
      .addFields(
        { name: `\u200b`, value: `W = Well, B = Bubble:` },
        { name: `\u200b`, value: '-----BOSS-----' },
        { name: `\u200b`, value: '------AW------' },
        { name: `\u200b`, value: '-------B-------' },
        { name: `\u200b`, value: 'CW------PW' },
      )
      .setFooter( `AWell gets priority if there is only one warlock.` )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};