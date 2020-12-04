const Discord = require( "discord.js" );
const fs = require( "fs" );
const config = require( './config.json' );
const roleClaim = require( './role-claim.js' );
const verify = require( './verify.js' );
const handleReaction = require( './handle-reaction.js' )
const prefix = config.prefix;
const bot = new Discord.Client();
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync( "./commands/" );
[ "command", "server" ].forEach( handler => {
  require( `./handlers/${ handler }` )( bot );
} );

bot.on( 'ready', () => {
  require( './events/client/ready' )( bot );
  roleClaim(bot);
  verify(bot);
} );

bot.on( 'guildMemberAdd', ( guildMember ) => {
  guildMember.roles.add( guildMember.guild.roles.cache.find( role => role.name === "Stardust" ) );
} );

bot.on( 'message', ( message ) => {
  require( './events/guild/message' )( bot, message );
} );

bot.on('messageReactionAdd', (reaction, user) => {
  console.log(`${user.tag} added ${reaction.emoji.name} to message ${reaction.message.id} in channel ${reaction.message.channel.id}.`);
  handleReaction(bot, reaction, user, true) 
})
bot.on( 'messageReactionRemove', (reaction, user) => { 
  console.log(`${user.tag} removed ${reaction.emoji.name} on message ${reaction.message.id} in channel ${reaction.message.channel.id}.`);
  handleReaction(bot, reaction, user, false) 
})

bot.login( process.env.token );//process.env.token );

// https://discordapp.com/api/oauth2/authorize?client_id=704022988722274304&permissions=8&scope=bot