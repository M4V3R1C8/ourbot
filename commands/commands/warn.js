const Discord = require( 'discord.js' );
const data = require( '../../data.json' );
const fs = require( 'fs' );
module.exports = {
  name: "warn",
  description: "Written warning log to users that violate clan rules. **NOT WORKING YET**",
  usage: "<@User> Reason",
  run: async ( bot, message, args ) => {
    if ( !message.member.hasPermission( "MANAGE_MESSAGES" ) ) return message.reply( "You don't have premission to do that!" );
    let reason = args.slice( 1 ).join( ' ' );
    let user = message.mentions.users.first();
    if ( message.mentions.users.size < 1 ) return message.reply( 'You must mention someone to warn them.' );
    if ( reason.length < 1 ) return message.reply( 'You must have a reason for the warning. Please be specific so that they may avoid the mistake in the future.' );

    let dmsEmbed = new Discord.RichEmbed()
      .setTitle( "Warn" )
      .setColor( "#00ff00" )
      .setDescription( `You have been warned on \`${ message.guild.name }\`` )
      .addField( "Warned by", message.author.tag )
      .addField( "Reason", reason )
      .addField( "#", data.user.result );

    user.send( dmsEmbed );

    message.delete();

    message.channel.send( `${ user.tag } has been warned ${ data.user.result } times` );
  }
};