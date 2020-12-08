const { MessageEmbed } = require( "discord.js" );
module.exports = {
  name: "prefix",
  aliases: [ "setprefix" ],
  description: "Change bot prefix for your server.",
  usage: "<new prefix>",
  run: async ( bot, message, args, db ) => {
    if ( !message.member.hasPermission( "MANAGE_MESSAGES" ) ) return message.reply( "You can't manage messages...." ).then( m => m.delete( 5000 ) );
    if ( args[ 0 ] ) {
      return setPrefix( bot, message, args[ 0 ], db );
    } else {
      return getPrefix( bot, message, db );
    }
  }
}

function getPrefix ( bot, message, db ) {
  db.collection('guilds').doc(message.guild.id).get().then((q) => {
    if(q.exists) {
      prefix = q.data().prefix;
    }
  }).then( async () => {
    const embed = new MessageEmbed()
      .setTitle( `Current Prefix: ${prefix}` )
      .setFooter( `Use ${prefix}prefix <value> to change your prefix.` );
    return message.channel.send( embed.setColor( `0x46789d` ) );
  });
}

function setPrefix ( bot, message, args, db ) {
  let nPrefix = args.toLowerCase();
  db.collection('guilds').doc(message.guild.id).update({
    'prefix' : nPrefix
  }).then( async () => {
    const embed = new MessageEmbed()
      .setTitle( `Updated Prefix: ${nPrefix}` )
      .setFooter( `Use ${nPrefix}prefix to check your prefix.` );
    return message.channel.send( embed.setColor( `0x46789d` ) );
  });
}