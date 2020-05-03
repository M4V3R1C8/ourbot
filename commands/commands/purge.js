
module.exports = {
  name: "purge",
  aliases: [ "clear", "nuke" ],
  description: "Deletes x messages from the chat. You must have the Manage Messages permission to use this command.",
  usage: "<x>",
  run: async ( client, message, args ) => {
    if ( message.deletable ) {
      message.delete();
    }

    // Member doesn't have permissions
    if ( !message.member.hasPermission( "MANAGE_MESSAGES" ) ) {
      return message.reply( "You can't delete messages...." ).then( m => m.delete( 5000 ) );
    }

    // Check if args[0] is a number
    if ( isNaN( args[ 0 ] ) || parseInt( args[ 0 ] ) <= 0 ) {
      return message.reply( "Yeah.... That's not a numer? I also can't delete 0 messages by the way." ).then( m => m.delete( 5000 ) );
    }

    // Maybe the bot can't delete messages
    if ( !message.guild.me.hasPermission( "MANAGE_MESSAGES" ) ) {
      return message.reply( "Sorryy... I can't delete messages." ).then( m => m.delete( 5000 ) );
    }

    let deleteAmount;

    if ( parseInt( args[ 0 ] ) > 100 ) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt( args[ 0 ] );
    }

    message.channel.bulkDelete( deleteAmount, true )
      .then( deleted => {
        if ( deleted.size < args[ 0 ] ) {
          message.channel.send( `Only \`${ deleted.size }\` messages deleted due to discord restrictions.` )
            .then( msg => { msg.delete( { timeout: 2500 } ); } );
        }
        else {
          message.channel.send( `Success` )
            .then( msg => { msg.delete( { timeout: 2500 } ); } );
        }
      } )
      .catch( err => message.reply( `Something went wrong... ${ err }` ) );
  }
};