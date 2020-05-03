const Discord = require( 'discord.js' );
module.exports = {
  name: "mweapons",
  aliases: [ "menagerieweapons" ],
  description: "Provides an infographic for managerie weapon recipies.",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `Click the image for a larger view!` )
      .setThumbnail( 'https://d1lss44hh2trtw.cloudfront.net/assets/editorial/2019/06/menagerie-recipes-weapons-destiny-2.jpg' )
      .addFields(
        { name: `\u200b`, value: `Every weapon granted in the managerie can be claimed with a specific recipe.` },
      )
      .setFooter( 'See the armor chart with marmor.' )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};