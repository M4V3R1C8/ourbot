const Discord = require( "discord.js" );
const fs = require( "fs" );
const config = require( './config.json' );
const prefix = config.prefix;
const bot = new Discord.Client( { disableMentions: 'everyone' } );
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync( "./commands/" );
[ "command", "server" ].forEach( handler => {
  require( `./handlers/${ handler }` )( bot );
} );
bot.on( 'ready', () => {
  require( './events/client/ready' )( bot );
} );
var dupea = 0;
var dupec = 0;
var duped = 0;
var dupes = 0;
var calla = [ 'c', 'd', 's' ];
var callc = [ 'a', 'd', 's' ];
var calld = [ 'a', 'c', 's' ];
var calls = [ 'a', 'c', 'd' ];
var actual = [];
bot.on( 'message', function ( message ) {
  // Calus
  if ( message.content.toLowerCase() === "a" && dupea == 0 ) { dupea = "a"; actual.unshift( message.content ); console.log( actual ); }
  if ( message.content.toLowerCase() === "c" && dupec == 0 ) { dupec = "c"; actual.unshift( message.content ); console.log( actual ); }
  if ( message.content.toLowerCase() === "d" && duped == 0 ) { duped = "d"; actual.unshift( message.content ); console.log( actual ); }
  if ( message.content.toLowerCase() === "s" && dupes == 0 ) { dupes = "s"; actual.unshift( message.content ); console.log( actual ); }
  actuals = actual.sort();
  if ( actuals.join( '|' ) === calla.join( '|' ) ) { message.channel.bulkDelete( 3, true ); message.channel.send( `Melee Axe: back left`, { files: [ "https://i.imgur.com/Y1FLQci.png" ] } ).then( actual.length = 0 ).then( dupea = 0 ).then( dupec = 0 ).then( duped = 0 ).then( dupes = 0 ); }
  if ( actuals.join( '|' ) === callc.join( '|' ) ) { message.channel.bulkDelete( 3, true ); message.channel.send( `Melee Cup: front left`, { files: [ "https://i.imgur.com/h8urTrG.png" ] } ).then( actual.length = 0 ).then( dupea = 0 ).then( dupec = 0 ).then( duped = 0 ).then( dupes = 0 ); }
  if ( actuals.join( '|' ) === calld.join( '|' ) ) { message.channel.bulkDelete( 3, true ); message.channel.send( `Melee Dog: back right`, { files: [ "https://i.imgur.com/4J1MWbl.png" ] } ).then( actual.length = 0 ).then( dupea = 0 ).then( dupec = 0 ).then( duped = 0 ).then( dupes = 0 ); }
  if ( actuals.join( '|' ) === calls.join( '|' ) ) { message.channel.bulkDelete( 3, true ); message.channel.send( `Melee Sun: front left`, { files: [ "https://i.imgur.com/Oolzssr.png" ] } ).then( actual.length = 0 ).then( dupea = 0 ).then( dupec = 0 ).then( duped = 0 ).then( dupes = 0 ); }
  // rest of the bot
  message.member; //-- GuildMember based
  message.author; //-- User based
  require( './events/guild/message' )( bot, message );
} );
bot.login( "NzA0MDIyOTg4NzIyMjc0MzA0.Xq8wBw.r7S3tUSgUjuRt03sSC0pLIVY5WE" );//process.env.token );

// https://discordapp.com/api/oauth2/authorize?client_id=704022988722274304&permissions=8&scope=bot