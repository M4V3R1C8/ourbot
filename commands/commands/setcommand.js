const FieldValue = require( 'firebase-admin' ).firestore.FieldValue;
module.exports = {
  name: "setcommand",
  aliases: [ "setcom" ],
  description: "Setup a custom text reply for your server.",
  usage: "<customCommandWithoutPrefix desired response>",
  run: async ( bot, message, args, db ) => {
    if ( !message.member.hasPermission( "MANAGE_MESSAGES" ) )  return message.reply( "Manage Messages Permission Required." );
    if (!args[1]) {
      db.collection('guilds').doc(message.guild.id).collection('custom').doc('commands').update({
        [args[0]]: FieldValue.delete()
      })
      message.channel.send(`Custom command ${args[0]} has been removed.`);
    } else {
      const firstElement = args.shift().toString();
      const secondElement = args.join(' ').toString();
      db.collection('guilds').doc(message.guild.id).collection('custom').doc('commands').update({
        [firstElement]: secondElement
      })
      message.channel.send(`Success!`);
    }
  }
}