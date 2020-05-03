const Discord = require( 'discord.js' );
module.exports = {
  name: "marmor",
  aliases: [ "menageriearmor" ],
  description: "Provides an infographic for managerie armor recipies.",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `Click the image for a larger view!` )
      .setThumbnail( 'https://d1lss44hh2trtw.cloudfront.net/assets/editorial/2019/06/menagerie-recipes-armor-destiny-2.jpg' )
      .addFields(
        { name: `\u200b`, value: `Every armor piece granted in the managerie can be claimed with a specific recipe.` },
      )
      .setFooter('See the weapons chart with mweapons.')
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};