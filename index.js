const Discord = require( "discord.js" );
const fs = require( "fs" );
const config = require( './config.json' );
const data = require( './data.json' );
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
} );

bot.on( 'guildMemberAdd', ( guildMember ) => {
  guildMember.roles.add( guildMember.guild.roles.cache.find( role => role.name === "Stardust" ) );
} );

bot.on( 'message', function ( message ) {
  // rest of the bot
  // message.member; //-- GuildMember based
  // message.author; //-- User based
  require( './events/guild/message' )( bot, message );
} );

bot.on( 'messageReactionAdd', async ( reaction, user ) => {
  if (user.bot) return;
  if(!reaction.guild) return;

  if(reaction.message.channel.id === "781282193396989994") {
    if(reaction.emoji.name === '1️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("781284379874820096");
    }
    if(reaction.emoji.name === '2️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("782682124234653727");
    }
    if(reaction.emoji.name === '3️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("782682328836603954");
    }
    if(reaction.emoji.name === '4️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("782682253670481940");
    }
    if(reaction.emoji.name === '5️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("781288186709147668");
    }
    if(reaction.emoji.name === '6️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("781288186709147668");
    }
    if(reaction.emoji.name === '7️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("781290350567882752");
    }
    if(reaction.emoji.name === '8️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("781293406277861388");
    }
    if(reaction.emoji.name === '9️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("782682775048159252");
    }
    if(reaction.emoji.name === '🔟') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("782682919227097101");
    }
  } else if(reaction.message.channel.id === "781282193396989994") {
    if(reaction.emoji.name === '✅') {
      await reaction.message.guild.members.cache.get(user.id).roles.add("706949672496922705");
      await reaction.message.guild.members.cache.get(user.id).roles.remove("781565994128113694");
    }
  }
} );

bot.on( 'messageReactionRemove', async ( reaction, user ) => {
  if (user.bot) return;
  if(!reaction.guild) return;
  
  if(reaction.message.channel.id === "781282193396989994") {
    if(reaction.emoji.name === '1️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("781284379874820096");
    }
    if(reaction.emoji.name === '2️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("782682124234653727");
    }
    if(reaction.emoji.name === '3️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("782682328836603954");
    }
    if(reaction.emoji.name === '4️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("782682253670481940");
    }
    if(reaction.emoji.name === '5️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("781288186709147668");
    }
    if(reaction.emoji.name === '6️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("781288186709147668");
    }
    if(reaction.emoji.name === '7️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("781290350567882752");
    }
    if(reaction.emoji.name === '8️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("781293406277861388");
    }
    if(reaction.emoji.name === '9️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("782682775048159252");
    }
    if(reaction.emoji.name === '🔟') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("782682919227097101");
    }
  } else if(reaction.message.channel.id === "781282193396989994") {
    if(reaction.emoji.name === '✅') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("706949672496922705");
      await reaction.message.guild.members.cache.get(user.id).roles.add("781565994128113694");
    }
  }
} );

bot.login( process.env.token );//process.env.token );

// https://discordapp.com/api/oauth2/authorize?client_id=704022988722274304&permissions=8&scope=bot