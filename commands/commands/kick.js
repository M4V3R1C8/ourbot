const { MessageEmbed } = require( 'discord.js' );
module.exports = {
  name: "kick",
  description: "Kick lfg players after each raid: Remove the lfg roll if they want to stick around.",
  category: "moderation",
  usage: "<user id> <reason>",
  run: async ( bot, message, args ) => {
    var count = 0;
    message.guild.members.forEach( member => {
      if ( member.roles.has( "lfg" ) ) {
        member.kick();
        count++;
      }
    } );
    const Embed = new MessageEmbed()
      .setTitle( `${ count } LFG Players have been kicked!!` )
      .setColor( `0x46789d` );
    message.channel.send( Embed );
  }
};