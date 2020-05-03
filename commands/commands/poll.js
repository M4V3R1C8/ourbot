const Discord = require( 'discord.js' );
module.exports = {
  name: "poll",
  description: "Create a poll by copying the numbers below and changing the options",
  usage: "<question>\n1️⃣ Lev\n2️⃣ EoW\n3️⃣ SoS\n4️⃣ LW\n5️⃣ SotP\n6️⃣ CoS\n7️⃣ GoS\n8️⃣ PvP\n9️⃣ NF\n🔟 Gambit",
  run: async ( bot, message, args ) => {
    var author = message.author;
    let question = message.content.split( `${ bot.prefix }poll ` ).join( "" );
    if ( !question ) return message.channel.send( `You did not specify your question!` );
    const Embed = new Discord.MessageEmbed()
      .setTitle( `New poll!` )
      .setDescription( `${ question }` )
      .setFooter( `${ message.author.username } created this poll.` )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
    await msg.react( "1️⃣" );
    await msg.react( "2️⃣" );
    await msg.react( "3️⃣" );
    await msg.react( "4️⃣" );
    await msg.react( "5️⃣" );
    await msg.react( "6️⃣" );
    await msg.react( "7️⃣" );
    await msg.react( "8️⃣" );
    await msg.react( "9️⃣" );
    await msg.react( "🔟" );
    msg.react( "❌" );
    bot.on( "messageReactionAdd", ( messageReaction, user, message ) => {
      if ( messageReaction == "❌" ) {
        if ( user == author ) {
          message.delete( { timeout: 500 } );
        }
      }
    } );
  }
};