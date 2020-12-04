const Discord = require( "discord.js" );
const fs = require( "fs" );
const config = require( './config.json' );
const roleClaim = require( './role-claim.js' );
const verify = require( './verify.js' );
const prefix = config.prefix;
const bot = new Discord.Client( { partials: ["MESSAGE", "CHANNEL", "REACTION"] } );
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync( "./commands/" );
[ "command", "server" ].forEach( handler => {
  require( `./handlers/${ handler }` )( bot );
} );

bot.on( 'ready', () => {
  require( './events/client/ready' )( bot );
  //roleClaim(bot);
  verify(bot);
} );

bot.on( 'guildMemberAdd', ( guildMember ) => {
  guildMember.roles.add( guildMember.guild.roles.cache.find( role => role.name === "Stardust" ) );
} );

bot.on( 'message', ( message ) => {
  require( './events/guild/message' )( bot, message );
} );

bot.login( process.env.token );//process.env.token );

// https://discordapp.com/api/oauth2/authorize?client_id=704022988722274304&permissions=8&scope=bot