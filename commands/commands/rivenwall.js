const Discord = require( 'discord.js' );
module.exports = {
  name: "rivenwall",
  aliases: [ "rw, lwwall, rivenwish" ],
  description: "Returns the strategy for 3 people and the image of the proper wish wall code.",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `LW Wish Wall!` )
      .setThumbnail( 'https://i.imgur.com/lmFDZtE.jpg' )
      .addFields(
        { name: `\u200b`, value: `Speeds/Farming Only:` },
        { name: `\u200b`, value: '3 fireteams, 1 solo, 2 people, and 3' },
        { name: `\u200b`, value: 'Everyone starts in Divalian Mists on the dreaming city' },
        { name: `\u200b`, value: 'solo goes in first and tells team 2 to join when the door opens' },
        { name: `\u200b`, value: 'Team 2 tells team 3 to join when they load in.' },
        { name: `\u200b`, value: 'Team 3 rallies at Kali, team 2 gets middle and right, solo gets left.' },
        { name: `\u200b`, value: 'After teleport to riven, solo and team 2 rally and go left, team 3 goes left.' },
      )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};