const { MessageEmbed } = require( 'discord.js' );
module.exports = {
  name: "kick",
  description: "Kick lfg players after each raid: Remove the lfg roll if they want to stick around.",
  category: "moderation",
  usage: "",
  run: async ( bot, message, args ) => {
    var count = 0;
    message.guild.members.cache.forEach( member => {
      if ( member.roles.cache.some( role => role.name === "Abnormalities" ) || member.roles.cache.some( role => role.name === "lfg" ) ) {
        count++;
        member.kick();
      }
    } );
    message.channel.bulkDelete( 1, true );
    const Embed = new MessageEmbed()
      .setTitle( `${ count } LFG Player(s) have been kicked!!` )
      .setFooter( `${ message.author.username } is to blame` )
      .setColor( `0x46789d` );
    message.channel.send( Embed ).then( msg => { msg.delete( { timeout: 2500 } ); count = 0; } );
  }
};