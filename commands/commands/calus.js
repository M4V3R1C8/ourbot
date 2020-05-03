const Discord = require( 'discord.js' );
module.exports = {
  name: "calus",
  description: "Allows text callouts for Calus\' Mind\'s eye. Everyone can callout at the same time with 0 audio issues. Give it a shot if voice chat is messing up.",
  usage: "will explain how to use the 4 callouts.",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `Text Callouts for Calus.` )
      .setThumbnail( 'https://i.imgur.com/h8urTrG.png' )
      .addFields(
        { name: `\u200b`, value: `Allows text callouts for Calus\' Mind\'s eye. Everyone can callout at the same time with 0 audio issues. Give it a shot if voice chat is messing up.` },
        { name: `\u200b`, value: 'Simply type a, c, d, or s as a single letter by itself and hit enter. Ourbot will respond via text and say which counselor to melee!' },
      )
      .setFooter( 'I developed this functionality for the Deaf Destiny Network when the Leviathan was first released!' )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};