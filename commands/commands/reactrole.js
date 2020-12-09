const Discord = require( 'discord.js' );
const FieldValue = require( 'firebase-admin' ).firestore.FieldValue;
module.exports = {
  name: "reactrole",
  description: "Remove a role from a reaction in a specific channel.",
  usage: "<:one: @role>",
  run: async ( bot, message, args, db ) => {
    if ( !message.member.hasPermission( "MANAGE_ROLES" ) ) return message.reply( "You can't manage roles...." ).then( m => m.delete( 5000 ) );
    if ( args.length < 2) return message.reply( "command :emoji: @role" );
    var add = args.unshift(message.channel.id);
    var added = args.join(' - ');
    const Embed = new Discord.MessageEmbed()
      .setThumbnail( 'https://i.imgur.com/7T91kCB.png' )
      .addFields(
        { name: `Channel:`, value: `<#${args[0]}>` },
        { name: `Reaction:`, value: `${args[1]}` },
        { name: `Role:`, value: `${args[2]}` },
      )
      .setColor( `0x46789d` );
    db.collection('roles').doc(message.guild.id).get().then((q) => {
      if(q.exists) {
        var removeRole = false;
        for(var i = 0; i < q.data().role_id.length; i++){
          var roleInfo = q.data().role_id[i];
          if(roleInfo === added) {
            removeRole = true;
          }
        }
        if (removeRole) {
          db.collection('roles').doc(message.guild.id).update({
            'role_id': FieldValue.arrayRemove(added)
          });
          message.channel.send( Embed.setTitle('Removed ReactRole from Channel') ).then( msg => { msg.delete( { timeout: 2500 } ); count = 0; } );
        } else {
          db.collection('roles').doc(message.guild.id).update({
            'role_id': FieldValue.arrayUnion(added)
          });
          message.channel.send( Embed.setTitle('Added ReactRole to Channel') ).then( msg => { msg.delete( { timeout: 2500 } ); count = 0; } );
        }
      }
    });
  }
};