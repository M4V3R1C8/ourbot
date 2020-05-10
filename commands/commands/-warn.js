const Discord = require( 'discord.js' );
const { MessageEmbed } = require( "discord.js" );
const fs = require( "fs" );

module.exports = {
  name: "-warn",
  aliases: [ "removewarn, removewarning" ],
  description: "Removes a warning from the mentioned user. Admin Only",
  usage: "<user id> <reason>",
  run: async ( bot, message, args ) => {
    let warns = JSON.parse( fs.readFileSync( "./warnings.json" ) );
    if ( !message.member.hasPermission( "MANAGE_MEMBERS" ) ) message.reply( "This toy is no made for You!" );
    let wUser = message.guild.member( message.mentions.members.first() ) || message.guild.members.get( args[ 0 ] );
    if ( wUser.hasPermission( "MANAGE_MESSAGES" ) ) {
      let reason = args.join( " " ).slice( 22 );

      if ( !warns[ wUser.id ] ) {
        warns[ wUser.id ] = {
          warns: 0,
        };
      }

      warns[ wUser.id ].warns--;
      console.log( warns );

      fs.writeFile( "./warnings.json", JSON.stringify( warns ), ( err ) => {
        if ( err ) console.log( err );
      } );

      message.channel.bulkDelete( 1, true );

      let warnEmbed = new MessageEmbed()
        .setDescription( "User Warnings" )
        .setColor( "#fc6400" )
        .addField( "Applauded User", `${ wUser }` )
        .addField( "Number of Warnings", warns[ wUser.id ].warns )
        .addField( "Reason", reason );

      message.channel.send( warnEmbed );
      return;
    }
  }
};