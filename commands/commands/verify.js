const Discord = require( 'discord.js' );
const data = require( './data.json' );
module.exports = {
  name: "verify",
  description: "Mod feature, don't worry about it",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `Please ✅ to the rules above in order to gain access to this server.` )
      .addFields(
        { name: `\u200b`, value: 'Just click the ✅ and you will see the voice channel.' },
      )
      .setFooter( `Come on, you can do it! Just click the ✅!` )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
    await msg.react( "✅" );
  }
};