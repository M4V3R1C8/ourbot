const Discord = require( 'discord.js' );
module.exports = {
  name: "shurowall",
  aliases: [ "catalystfarm, shurowish" ],
  description: "Returns an image of the proper wish wall code for Shuro Chi.",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `LW Wish Wall!` )
      .setThumbnail( 'https://i.imgur.com/lmFDZtE.jpg' )
      .addFields(
        { name: `\u200b`, value: `Good luck farming your catalysts!` },
      )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};