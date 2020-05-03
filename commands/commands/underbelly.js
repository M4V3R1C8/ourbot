const Discord = require( 'discord.js' );
module.exports = {
  name: "underbelly",
  aliases: [ "um" ],
  description: "Provides a map of the underbelly.",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `Underbelly Map and Routes!` )
      .setThumbnail( 'https://i.imgur.com/o6pudX7.jpg' )
      .addFields(
        { name: `\u200b`, value: `Routes:` },
        { name: `\u200b`, value: 'Royal Pools to Pleasure Gardens or Calus: Switches TL, BL, BR, TR' },
        { name: `\u200b`, value: 'Royal Pools to Gauntlet: Sync Plates' },
        { name: `\u200b`, value: 'Pleasure Gardens to Gauntlet or Calus: Left Pressure Plate' },
        { name: `\u200b`, value: 'Pleasure Gardens to Royal Pools: Right Pressure Plate' },
        { name: `\u200b`, value: 'Gauntlet to Pleasure Gardens or Calus: Irrigation Basin BL, FR, FL, BR' },
        { name: `\u200b`, value: 'Gauntlet to Royal Pools: Armory Door BL, FR, FL, BR' },
      )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};