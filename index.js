const Discord = require( "discord.js" );
const fs = require( "fs" );
const config = require( './config.json' );
const prefix = config.prefix;
const token = config.token;
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
bot.on( 'message', async message => {
  message.member; //-- GuildMember based
  message.author; //-- User based
  require( './events/guild/message' )( bot, message );
} );
bot.login( token );

// https://discordapp.com/api/oauth2/authorize?client_id=704022988722274304&permissions=8&scope=bot